import localforage from "localforage";

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
			"Kick Start": true,
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
