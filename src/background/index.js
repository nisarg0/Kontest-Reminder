import {
	setMyContestsDB,
	getSubscriptionStatusDB,
	setSubscriptionStatusDB,
	setDeletedContestsDB,
	getDeletedContestsDB,
	setDailyChallengeDB,
	getMyContestsDB,
} from "../Helper/DbHelper";

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
var subscriptionStatus = {};

var defaultDailyChallenge = {
	leetcode: {
		title: "Daily Challenge",
		difficulty: "",
		link: "",
		platform: "leetcode",
	},
	geeksforgeeks: {
		title: "Challenge of the Day",
		difficulty: "",
		link: "https://practice.geeksforgeeks.org/problem-of-the-day",
		platform: "geeksforgeeks",
	},
};

// Fetch Function
async function fetchAllMyContests() {
	myContests = [];
	// We delete an element in it if it has occured in the fetch...
	var usedDeletedContests = [];
	var contests = await fetchContestDetails();
	for (var contest of contests) {
		if (subscriptionStatus[contest.site]) {
			var contest_name = contest.name;
			var isDeleted = false;
			for (var deletedContest of deletedContests) {
				if (deletedContest === contest_name) {
					isDeleted = true;
					usedDeletedContests.push(contest);
				}
			}
			if (!isDeleted) myContests.push(contest);
		}
	}

	// add alarm for each contests as we want to store the status of alarm
	var oldMyContests = (await getMyContestsDB()) || [];
	for (contest of myContests) {
		contest.autoOpen = false;

		for (var oldContest of oldMyContests) {
			if (oldContest.name === contest.name) {
				if (oldContest.autoOpen) contest.autoOpen = true;
			}
		}
	}

	deletedContests = usedDeletedContests;
}

// ================================= Recieve Alarm Request ============================

browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	if (request.data === "Update MyContests") {
		sendResponse({ data: "success" });
		subscriptionStatus = await getSubscriptionStatusDB();
		deletedContests = await getDeletedContestsDB();
		await fetchAllMyContests();
		await setDeletedContestsDB(deletedContests);
		await setMyContestsDB(myContests);
		await setSubscriptionStatusDB(subscriptionStatus);
	}
});

// =============================Alarms, startup, instaleed functions =======================

// create alarm for fresh on installed/updated, and start fetch data
browser.runtime.onInstalled.addListener((details) => {
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

// schedule a new fetch every 1 hour
function scheduleRequest() {
	console.log("schedule refresh alarm to 60 minutes...");
	browser.alarms.create("refresh", { periodInMinutes: 60 });
}

browser.alarms.onAlarm.addListener(async (alarm) => {
	console.log("alarm listened" + alarm.name);
	if (alarm.name === "refresh") {
		console.log("in refresh");
		subscriptionStatus = await getSubscriptionStatusDB();
		deletedContests = await getDeletedContestsDB();
		await fetchAllMyContests();
		await updateDailyChallenge();
		await setDeletedContestsDB(deletedContests);
		await setMyContestsDB(myContests);
	} else {
		myContests = await getMyContestsDB();
		for (var i = 0; i < myContests.length; i++) {
			if (alarm.name === myContests[i].name) {
				await browser.tabs.create({
					active: true,
					url: myContests[i].url,
				});
				browser.alarms.clear(alarm.name);
				break;
			}
		}
		myContests[i].autoOpen = false;
		await setMyContestsDB(myContests);
	}
});

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
		platform: "leetcode",
	};
	return res;
}

const updateDailyChallenge = async () => {
	var leetcodeChallenge = await fetchLeetCodeDailyQuestion();
	defaultDailyChallenge.leetcode = leetcodeChallenge;

	await setDailyChallengeDB(defaultDailyChallenge);
};

// fetch data and save to local storage
async function startRequest() {
	// We need to get the array that user has stored previously if not then we use original one
	subscriptionStatus = (await getSubscriptionStatusDB()) || {};
	deletedContests = (await getDeletedContestsDB()) || [];
	await fetchAllMyContests();
	await updateDailyChallenge();
	await setDeletedContestsDB(deletedContests);
	await setMyContestsDB(myContests);
	await setSubscriptionStatusDB(subscriptionStatus);
}
