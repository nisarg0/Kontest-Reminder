import localforage from "localforage";
const { DateTime } = require("luxon");
export const setDeletedContestsDB = async (deletedContests) => {
	await localforage.setItem("deletedContests", deletedContests, function (err) {
		if (err) console.log(err);
	});
};
export const getDeletedContestsDB = async () => {
	var res = await localforage.getItem("deletedContests");
	if (res === null) return [];
	console.log("getDeletedContestsDB: ", res);
	return res;
};
export const getMyContestsDB = async () => {
	var res = await localforage.getItem("myContests");
	if (res === null) return [];
	return res;
};
export const setMyContestsDB = async (myContests) => {
	var res = await localforage.setItem("myContests", myContests);
	if (res === null) console.log("Error in setMyContestsDB");
	return res;
};
export const getSubscriptionStatusDB = async () => {
	var res = await localforage.getItem("platforms");
	if (res === null)
		return {
			dailyChallenge: true,
			CodeChef: true,
			CodeForces: true,
			LeetCode: true,
			AtCoder: true,
			HackerEarth: true,
			HackerRank: true,
			GeeksforGeeks: true,
			TopCoder: true,
		};
	return res;
};
export const setSubscriptionStatusDB = async (platforms) => {
	// console.log("setSubscriptionStatusDB: ", platforms);
	return await localforage.setItem("platforms", platforms, function (err) {
		if (err) console.log(err);
	});
};
export const setDailyChallengeDB = async (dailyChallenge) => {
	return await localforage.setItem(
		"dailyChallenge",
		dailyChallenge,
		function (err) {
			if (err) console.log(err);
		}
	);
};
export const getDailyChallengeDB = async () => {
	var res = await localforage.getItem("dailyChallenge");
	console.log("getDailyChallengeDB: ", res);
	if (res === null) return {};
	return res;
};

export const fetchGfgDailyQuestion = async () => {
	var res = {
		title: "",
		difficulty: "",
		link: "",
		platform: "geeksforgeeks",
	};
	const url =
		"https://practiceapi.geeksforgeeks.org/api/v1/problems-of-day/problem/today/";

	let sentData = {
		mode: "no-cors",
	};
	try {
		const response = await fetch(url, sentData);
		const data = await response.json();
		res = {
			title: data.problem_name,
			difficulty: data.difficulty,
			link: data.problem_url,
			platform: "geeksforgeeks",
		};
		console.log(res);
		return res;
	} catch (error) {
		console.log("Error:", error);
		return null;
	}
};

export const getGfgContests = async () => {
	function getDuration(start_time, end_time) {
		const startTime = DateTime.fromISO(start_time);
		const endTime = DateTime.fromISO(end_time);
		const duration = endTime.diff(startTime).as("seconds");
		return duration;
	}

	function getIn24Hours(start_time) {
		const currentTime = DateTime.now();
		const startTime = DateTime.fromISO(start_time);
		const timeDifference = startTime.diff(currentTime);
		const isIn24Hours =
			timeDifference > 0 && timeDifference <= 24 * 60 * 60 * 1000;
		return isIn24Hours ? "Yes" : "No";
	}

	function getStatus(start_time, end_time) {
		const currentTime = DateTime.now();
		const startTime = DateTime.fromISO(start_time);
		const endTime = DateTime.fromISO(end_time);
		if (currentTime >= startTime && currentTime < endTime) {
			return "CODING";
		} else {
			return "BEFORE";
		}
	}
	let sentData = {
		mode: "no-cors",
	};
	try{
		const response = await fetch(
			"https://practiceapi.geeksforgeeks.org/api/vr/events/?page_number=1&sub_type=all&type=contest",
			sentData
		);
		if (!response.ok) {
			throw new Error("Failed to fetch contest data");
		}
		const data = await response.json();
		const contestsData = data.results.upcoming;
		var gfgContests = [];
	
		contestsData.forEach((contestData) => {
			const contest = {
				autoOpen:false,
				name: contestData.name,
				url: `https://practice.geeksforgeeks.org/contest/${contestData.slug}`,
				start_time: contestData.start_time,
				end_time: contestData.end_time,
				duration:(getDuration(contestData.start_time, contestData.end_time)).toString(),
				in_24_hours: getIn24Hours(contestData.start_time),
				status: getStatus(contestData.start_time, contestData.end_time),
				site: "GeeksforGeeks",
			};
			gfgContests.push(contest);
		});
		return gfgContests;

	}catch (error) {
		console.log("Error:", error);
		return null;
	}
	
};
