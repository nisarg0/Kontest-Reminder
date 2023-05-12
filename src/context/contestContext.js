import React, { useEffect } from "react";
import { useState } from "react";
import {
	setDeletedContestsDB,
	getDeletedContestsDB,
	// getMyContestDB,
	// getPlatformsDB,
	getSubscriptionStatusDB,
	setMyContestsDB,
	getMyContestsDB,
	setSubscriptionStatusDB,
} from "../Helper/DbHelper.js";

const ContestContext = React.createContext();

// const defaultSubscribtion = getSubscriptionStatusDB() || {};

const defaultDailyChallenge = {
	leetcode: {
		title: "cross-lines",
		difficulty: "Medium",
		link: "https://leetcode.com/problems/uncrossed-lines//",
		platform: "leetcode",
	},
	geeksforgeeks: {
		title: "Challenge of the Day",
		difficulty: "",
		link: "https://practice.geeksforgeeks.org/problem-of-the-day",
		platform: "geeksforgeeks",
	},
};

// Add condition for is subscribed here and we can maintain the list of subscribed sites
const filterContest = (contests, subscribed) => {
	const ongoing = [],
		upcoming = [],
		today = [];

	contests.forEach((contest) => {
		const now = new Date();
		const start_time = new Date(contest.start_time);
		const end_time = new Date(contest.end_time);
		const contestSite = contest.site;
		console.log("subscribed: ", subscribed);
		if (subscribed[contestSite]) {
			if (now < start_time && start_time - now < 86400000) {
				today.push(contest);
			} else if (now < start_time) {
				upcoming.push(contest);
			} else if (now <= end_time && now >= start_time) {
				ongoing.push(contest);
			}
		}
	});

	return { ongoing, upcoming, today };
};

// console.log("defaultSubscribtion: ", defaultSubscribtion);

const ContestProvider = ({ children }) => {
	const [contests, setContests] = useState([]);
	const [subscribed, setSubscribed] = useState([]);

	const filteredContests = filterContest(contests, subscribed);
	const ongoing = filteredContests.ongoing;
	const upcoming = filteredContests.upcoming;
	const today = filteredContests.today;
	console.log("ongoing1: ", ongoing);

	useEffect(() => {
		const fetchData = async () => {
			const defaultContest = (await getMyContestsDB()) || [];
			const deletedContests = (await getDeletedContestsDB()) || [];
			const defaultSubscribtion = (await getSubscriptionStatusDB()) || {};

			console.log("defaultContest: ", defaultContest);
			setContests(defaultContest);
			setSubscribed(defaultSubscribtion);
			setDeletedContestsDB(deletedContests);
		};
		fetchData();
	}, []);

	const [dailyChallenge, setDailyChallenge] = useState(
		defaultDailyChallenge.geeksforgeeks
	);

	// Delete contest if it is in the past
	const deleteContest = (name) => {
		const newContests = contests.filter((contest) => contest.name !== name);
		setContests(newContests);
		// deletedContests.push(name);

		setMyContestsDB(newContests);
		setDeletedContestsDB(deleteContest);
	};

	const changeSubStatus = (site) => {
		var temp = { ...subscribed };
		temp[site] = !temp[site];

		setSubscriptionStatusDB(temp);
		setSubscribed(temp);
	};
	const changeDailyChallenge = () => {
		var temp = { ...subscribed };
		temp.dailyChallenge = !temp.dailyChallenge;

		var tempDailyChallengeData = temp.dailyChallenge
			? defaultDailyChallenge.geeksforgeeks
			: defaultDailyChallenge.leetcode;

		// console.log("tempDailyChallengeData: ", tempDailyChallengeData);

		setDailyChallenge(tempDailyChallengeData);
		setSubscribed(temp);
	};
	return (
		<ContestContext.Provider
			value={{
				ongoing,
				upcoming,
				today,
				subscribed,
				deleteContest,
				changeSubStatus,
				dailyChallenge,
				changeDailyChallenge,
			}}
		>
			{children}
		</ContestContext.Provider>
	);
};

export default ContestProvider;

export { ContestContext };
