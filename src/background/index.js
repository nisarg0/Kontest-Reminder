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
		platform: "hacker_rank",
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
	// console.log("In fetch all my contests");
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

// ================================= Recieve Alarm Request ============================

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	// console.log("Msg recieed");
	if (request.data === "Update MyContests") {
		sendResponse({ data: "success" });
		await getPlatforms();
		await getDeletedContests();
		await fetchAllMyContests();
		await setDeletedContests();
		await setmyContests();
		await setPlatforms();
	}
});

// =============================Alarms, startup, instaleed functions =======================

// create alarm for fresh on installed/updated, and start fetch data
chrome.runtime.onInstalled.addListener(() => {
	// console.log("onInstalled....");
	scheduleRequest();
	startRequest();
});

// fetch and save data when chrome restarted, alarm will continue running when chrome is restarted
chrome.runtime.onStartup.addListener(() => {
	// console.log("onStartup....");
	startRequest();
});

// schedule a new fetch every 1440 minutes
function scheduleRequest() {
	console.log("schedule refresh alarm to 60 minutes...");
	chrome.alarms.create("refresh", { periodInMinutes: 60 });
}

chrome.alarms.onAlarm.addListener(async (alarm) => {
	if (alarm.name === "refresh") {
		console.log("in refresh");
		await getPlatforms();
		await getDeletedContests();
		await fetchAllMyContests();
		await setDeletedContests();
		await setmyContests();
	} else if (alarm.name === "ContestName") {
		// console.log("Contest Remainder Listened");
	} else {
		var AlarmContests = [];
		await localforage.getItem("AlarmContests", function (err, value) {
			if (value === null) {
				// console.log("Err: No Alarm in DB");
				return;
			}
			AlarmContests = value;
		});
		for (var i = 0; i < AlarmContests.length; i++) {
			if (alarm.name === AlarmContests[i].name) {
				await chrome.tabs.create({
					active: true,
					url: AlarmContests[i].url,
				});
				chrome.alarms.clear(alarm.name);
				// console.log("Created new tab with contest");
				break;
			}
		}
		AlarmContests.splice(i, 1);
		localforage.setItem("AlarmContests", AlarmContests);
	}
	console.log(AlarmContests);
});

// ========================================= DB ===================================================
async function setmyContests() {
	// console.log("In setmyContests");
	await localforage.setItem("myContests", myContests);
}

async function setPlatforms() {
	// console.log("In setPlatforms");
	await localforage.setItem("platforms", platforms);
}

async function setDeletedContests() {
	// console.log("In setDeletedContests");
	await localforage.setItem("deletedContests", deletedContests);
}

async function getPlatforms() {
	// console.log("1. In getPlatforms");
	await localforage.getItem("platforms", function (err, value) {
		if (value === null) {
			// console.log("Err: No platforms array in DB");
			return;
		}
		platforms = value;
		// console.log(value);
	});
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
	// console.log("start HTTP Request...");
	// We need to get the array that user has stored previously if not then we use original one
	await getPlatforms();
	await getDeletedContests();
	await fetchAllMyContests();
	await setDeletedContests();
	await setmyContests();
	await setPlatforms();
	// getmyContests();
	// console.log(myContests);
	// console.log(deletedContests);
}
