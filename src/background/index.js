import localforage from "localforage";

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

// Fetch Function
async function fetchAllMyContests() {
	// console.log("In fetch all my contests");
	myContests = [];

	var contests = await fetchContestDetails();
	console.log(contests);
	var unwantedContests = [];
	// Delete from deleted contests which are over
	for (var contestName in deletedContests) {
		for (let i = 0; i < contests.length; i++)
			if (contestName === contests[i].name) unwantedContests.push(contestName);
	}

	for (let i = 0; i < unwantedContests.length; i++)
		deletedContests.splice(deletedContests.indexOf(unwantedContests[i]), 1);

	myContests = contests;
}

// ================================= Recieve Alarm Request ============================

browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	// console.log("Msg recieed");
	if (request.data === "Update MyContests") {
		sendResponse({ data: "success" });
		await getDeletedContests();
		await fetchAllMyContests();
		await setDeletedContests();
		await setmyContests();
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
		await getDeletedContests();
		await fetchAllMyContests();
		await setDeletedContests();
		await setmyContests();
	} else {
		var AlarmContests = [];
		await localforage.getItem("autoOpen", function (err, value) {
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
		localforage.setItem("autoOpen", AlarmContests);
		console.log("Printing AlarmContests:");
		console.log(AlarmContests);
	}
});

// ========================================= DB ===================================================
async function setmyContests() {
	// console.log("In setmyContests");
	// console.log(myContests[0]);
	// myContests[0].start_time = "2022-01-22T18:26:00.000Z";
	// console.log("After changing: ");
	// console.log(myContests[0]);

	await localforage.setItem("contests", myContests);
}

// async function setPlatforms() {
// 	// console.log("In setPlatforms");
// 	await localforage.setItem("platforms", platforms);
// }

async function setDeletedContests() {
	// console.log("In setDeletedContests");
	await localforage.setItem("deletedContests", deletedContests);
}

// async function getPlatforms() {
// 	// console.log("1. In getPlatforms");
// 	await localforage.getItem("platforms", function (err, value) {
// 		if (value === null) {
// 			// console.log("Err: No platforms array in DB");
// 			return;
// 		}
// 		platforms = value;
// 		// console.log(value);
// 	});
// }

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
	const res = await fetch(`https://www.kontests.net/api/v1/all`, {
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

// fetch data and save to local storage
async function startRequest() {
	// console.log("start HTTP Request...");
	// We need to get the array that user has stored previously if not then we use original one
	// await getPlatforms();
	await getDeletedContests();
	await fetchAllMyContests();
	await setDeletedContests();
	await setmyContests();
	// await setPlatforms();
}
