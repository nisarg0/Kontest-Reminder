import localforage from "localforage";
import { setMyContestsDB, getSubscriptionStatusDB } from "../Helper/DbHelper";

var browser = require("webextension-polyfill");

console.log("IN background");

/**
 * How to manage deleted Contests?
 * If some contest is deleted then its added to Deleted contests array...
 *
 * If some contest is in deleted contests then even after fetching don't add it to myContests.
 *
 * Now to avoid deletedContests size becoming infinite...
 * We deleted the element in it if has not occued during a fetch of all contests.
 */

var myContests = [];
var deletedContests = [];

var subscriptionStatus = {
	CodeChef: true,
	CodeForces: true,
	LeetCode: true,
	AtCoder: true,
	HackerEarth: true,
	HackerRank: true,
	"Kick Start": true,
	TopCoder: true,
};

// Fetch Function
async function fetchAllMyContests() {
	myContests = [];

	// We delete an element in it if tit has occured in the fetch...
	var usedDeletedContests = [];

	var contests = await fetchContestDetails();

	for (var contest of contests) {
		if (contest.duration <= 864001 && subscriptionStatus[contest.site]) {
			var contest_name = contest.name;
			var isDeleted = false;
			for (var deletedContest of deletedContests) {
				if (deletedContest.name === contest_name) {
					isDeleted = true;
					usedDeletedContests.push(contest);
				}
			}
			if (!isDeleted) myContests.push(contest);
		}
	}

	console.log("myContests in fetch All Contests", myContests);

	deletedContests = usedDeletedContests;
}

// ================================= Recieve Alarm Request ============================

browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	// console.log("Msg recieed");
	if (request.data === "Update MyContests") {
		sendResponse({ data: "success" });
		await getSubscriptionStatusDB();
		await getDeletedContests();
		await fetchAllMyContests();
		await setDeletedContests();
		await setMyContestsDB(myContests);
		await setSubscriptionStatus();
	}
});

// =============================Alarms, startup, instaleed functions =======================

// create alarm for fresh on installed/updated, and start fetch data
browser.runtime.onInstalled.addListener((details) => {
	// console.log("onInstalled....");
	scheduleRequest();
	startRequest();

	if (details.reason === "install") {
		var uri = "https://nisarg0.github.io/Kontest-Reminder/";
		browser.tabs.create({ active: true, url: uri });
	} else if (details.reason === "update") {
		var thisVersion = browser.runtime.getManifest().version;
		console.log(
			"Updated from " + details.previousVersion + " to " + thisVersion + "!"
		);
	}
});

// schedule a new fetch every 1440 minutes
function scheduleRequest() {
	console.log("schedule refresh alarm to 60 minutes...");
	browser.alarms.create("refresh", { periodInMinutes: 60 });
}

browser.alarms.onAlarm.addListener(async (alarm) => {
	console.log("alarm listened" + alarm.name);
	if (alarm.name === "refresh") {
		console.log("in refresh");
		await getSubscriptionStatusDB();
		await getDeletedContests();
		await fetchAllMyContests();
		await setDeletedContests();
		await setMyContestsDB(myContests);
	} else {
		var AlarmContests = [];
		await localforage.getItem("AlarmContests", function (err, value) {
			if (value === null) {
				console.log("Err: No Alarm in DB");
				return;
			}
			AlarmContests = value;
		});
		for (var i = 0; i < AlarmContests.length; i++) {
			if (alarm.name === AlarmContests[i].name) {
				await browser.tabs.create({
					active: true,
					url: AlarmContests[i].url,
				});
				browser.alarms.clear(alarm.name);
				// console.log("Created new tab with contest");
				break;
			}
		}
		AlarmContests.splice(i, 1);
		localforage.setItem("AlarmContests", AlarmContests);
		console.log("Printing AlarmContests:");
		console.log(AlarmContests);
	}
});

// ========================================= DB ===================================================

async function setSubscriptionStatus() {
	// console.log("In setSubscriptionStatus");
	await localforage.setItem("subsciptionStatus", subscriptionStatus);
}

async function setDeletedContests() {
	// console.log("In setDeletedContests");
	await localforage.setItem("deletedContests", deletedContests);
}

async function getDeletedContests() {
	// console.log("1. In get Deleted Contests");
	await localforage.getItem("deletedContests", function (err, value) {
		if (err || value === null) {
			// console.log("Err: No deletedContests array in DB");
			return;
		}
		deletedContests = value;
		// console.log(value);
	});
}

// ========================================== Helper ==================================================

async function fetchContestDetails() {
	const res = await fetch(`https://kontests.net/api/v1/all`, {
		method: "GET",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	});
	if (!res.ok) {
		const message = "An error has occured";
		throw new Error(message);
	}

	var contestDetails = await res.json();
	return contestDetails;
}

async function fetchLeetCodeDailyQuestion() {
	const LEETCODE_API_ENDPOINT = "https://leetcode.com/graphql";
	const DAILY_CODING_CHALLENGE_QUERY = `
    query questionOfToday {
        activeDailyCodingChallengeQuestion {
            link
            question {
                difficulty
                title
            }
        }
    }`;

	const init = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ query: DAILY_CODING_CHALLENGE_QUERY }),
	};

	let res = await fetch(LEETCODE_API_ENDPOINT, init);
	if (!res.ok) {
		const message = "An error has occured";
		throw new Error(message);
	}
	res = await res.json();

	res = {
		link:
			"https://leetcode.com" + res.data.activeDailyCodingChallengeQuestion.link,
		difficulty: res.data.activeDailyCodingChallengeQuestion.question.difficulty,
		title: res.data.activeDailyCodingChallengeQuestion.question.title,
	};
	console.log(res);
	return res;
}

fetchLeetCodeDailyQuestion();

// fetch data and save to local storage
async function startRequest() {
	// console.log("start HTTP Request...");
	// We need to get the array that user has stored previously if not then we use original one
	await getSubscriptionStatusDB();
	await getDeletedContests();
	await fetchAllMyContests();
	await setDeletedContests();
	await setMyContestsDB(myContests);
	await setSubscriptionStatus();
}
