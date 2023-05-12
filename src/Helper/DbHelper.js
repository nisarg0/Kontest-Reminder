import localforage from "localforage";

export const setDeletedContestsDB = async (deletedContests) => {
	await localforage.setItem("deletedContests", deletedContests, function (err) {
		if (err) console.log(err);
	});
};
export const getDeletedContestsDB = async () => {
	return await localforage.getItem("deletedContests", function (err, value) {
		if (err) console.log(err);
		return value;
	});
};
export const getMyContestsDB = async () => {
	console.log("getMyContestDB");
	var res = await localforage.getItem("myContests");
	if (res === null) return [];
	console.log("getMyContestDB: ", res);
	return res;
};
export const setMyContestsDB = async (myContests) => {
	console.log("setMyContestsDB: ", myContests);
	var res = await localforage.setItem("myContests", myContests);
	console.log("setMyContestsDB: ", res);
};
export const getSubscriptionStatusDB = async () => {
	var res = await localforage.getItem("platforms");
	if (res === null)
		return {
			CodeChef: true,
			CodeForces: true,
			LeetCode: true,
			AtCoder: true,
			HackerEarth: true,
			HackerRank: true,
			"Kick Start": true,
			TopCoder: true,
		};
	return res;
};
export const setSubscriptionStatusDB = async (platforms) => {
	console.log("setSubscriptionStatusDB: ", platforms);
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
	return await localforage.getItem("dailyChallenge", function (err, value) {
		if (err) console.log(err);
		return value;
	});
};
