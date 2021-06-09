import localforage from "localforage";
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

var platforms = [
	{
		platform: "code_chef",
		isSubscribed: true,
	},
	{
		platform: "codeforces",
		isSubscribed: true,
	},
	{
		platform: "leet_code",
		isSubscribed: true,
	},
	{
		platform: "at_coder",
		isSubscribed: true,
	},
	{
		platform: "hacker_earth",
		isSubscribed: true,
	},
	{
		platform: "kick_start",
		isSubscribed: true,
	},
	{
		platform: "top_coder",
		isSubscribed: true,
	},
];

// Fetch Function
async function fetchAllMyContests() {
	console.log("In fetch all my contests");
	myContests = [];

	// We delete an element in it if tit has occured in the fetch...
	var usedDeletedContests = [];

	for (var i = 0; i < platforms.length; i++) {
		if (!platforms[i].isSubscribed) continue;

		var contests = await fetchContestDetails(platforms[i].platform);
		for (var contest of contests) {
			if (contest.duration <= 864001) {
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
	}
	deletedContests = usedDeletedContests;
}

// ================================= Testing ============================

// =============================Alarms, startup, instaleed functions =======================

// create alarm for fresh on installed/updated, and start fetch data
chrome.runtime.onInstalled.addListener(() => {
	console.log("onInstalled....");
	scheduleRequest();
	startRequest();
});

// fetch and save data when chrome restarted, alarm will continue running when chrome is restarted
chrome.runtime.onStartup.addListener(() => {
	console.log("onStartup....");
	startRequest();
});

// schedule a new fetch every 1440 minutes
function scheduleRequest() {
	console.log("schedule refresh alarm to 1440 minutes...");
	chrome.alarms.create("refresh", { periodInMinutes: 60 });
}

// function contestRemainder() {
// 	console.log("In contestRemainder");
// 	var date = new Date();
// 	console.log(typeof date);
// 	console.log(date + 1);
// 	chrome.alarms.create("ContestName", {
// 		when: 1000 + Date(),
// 	});
// 	console.log("reminderSet at " + date);
// }
// NOT WORKING
function deleteContestRemainder() {
	console.log("In deleteContestRemainder");
}

chrome.alarms.onAlarm.addListener(async (alarm) => {
	if (alarm.name === "refresh") {
		await getPlatforms();
		await getDeletedContests();
		await fetchAllMyContests();
		await setDeletedContests();
		await setmyContests();
	}
	if (alarm.name === "ContestName") {
		console.log("Contest Remainder Listened");
	}
});

// ========================================= DB ===================================================
async function setmyContests() {
	console.log("In setmyContests");
	await localforage.setItem("myContests", myContests);
}

async function setmyPlatforms() {
	console.log("In setmyPlatforms");
	await localforage.setItem("platforms", platforms);
}

async function setDeletedContests() {
	console.log("In setDeletedContests");
	await localforage.setItem("deletedContests", deletedContests);
}

function getmyContests() {
	console.log("In getmyContests");
	localforage.getItem("myContests", function (err, value) {
		if (err) throw err;
		myContests = value;
	});
}

async function getPlatforms() {
	console.log("1. In getPlatforms");
	await localforage.getItem("platforms", function (err, value) {
		if (err || value === null) {
			console.log("Err: No platforms array in DB");
			return;
		}
		platforms = value;
		console.log(value);
	});
}

async function getDeletedContests() {
	console.log("1. In get Deleted Contests");
	await localforage.getItem("deltedContests", function (err, value) {
		if (err || value === null) {
			console.log("Err: No deletedContests array in DB");
			return;
		}
		deletedContests = value;
		console.log(value);
	});
}

// ========================================== Helper ==================================================

async function fetchContestDetails(platform) {
	const res = await fetch(`https://www.kontests.net/api/v1/${platform}`, {
		method: "GET",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	});
	if (!res.ok) {
		const message = "An error has occured";
		throw new Error(message);
	}

	const contestDetails = await res.json();
	return contestDetails;
}

// fetch data and save to local storage
async function startRequest() {
	console.log("start HTTP Request...");
	// We need to get the array that user has stored previously if not then we use original one
	await getPlatforms();
	await getDeletedContests();
	await fetchAllMyContests();
	await setDeletedContests();
	await setmyContests();
	getmyContests();
	console.log(myContests);
	console.log(deletedContests);
	// contestRemainder();
}
