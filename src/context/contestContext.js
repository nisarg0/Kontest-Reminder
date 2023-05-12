import React, { useEffect } from "react";
import { useState } from "react";
import {
	setDeletedContestsDB,
	getDeletedContestsDB,
	// getMyContestDB,
	getSubscriptionStatusDB,
	setMyContestsDB,
	getMyContestsDB,
	setSubscriptionStatusDB,
	getDailyChallengeDB,
	// setDailyChallengeDB,
} from "../Helper/DbHelper.js";

const ContestContext = React.createContext();

// const defaultSubscribtion = getSubscriptionStatusDB() || {};

var defaultDailyChallenge = {};

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

const ContestProvider = ({ children }) => {
	const [contests, setContests] = useState([]);
	const [subscribed, setSubscribed] = useState([]);
	const [deletedContests, setDeletedContests] = useState([]);
	const [dailyChallenge, setDailyChallenge] = useState({});

	const filteredContests = filterContest(contests, subscribed);
	const ongoing = filteredContests.ongoing;
	const upcoming = filteredContests.upcoming;
	const today = filteredContests.today;

	useEffect(() => {
		const fetchData = async () => {
			const defaultContest = (await getMyContestsDB()) || [];
			const deletedContests = (await getDeletedContestsDB()) || [];
			const defaultSubscribtion = (await getSubscriptionStatusDB()) || {};
			defaultDailyChallenge = (await getDailyChallengeDB()) || {};

			setDailyChallenge(
				defaultDailyChallenge[
					defaultSubscribtion["dailyChallenge"] ? "geeksforgeeks" : "leetcode"
				]
			);

			setContests(defaultContest);
			setSubscribed(defaultSubscribtion);
			setDeletedContestsDB(deletedContests);
		};
		fetchData();
	}, []);

	// Delete contest if it is in the past
	const deleteContest = (name) => {
		const newContests = contests.filter((contest) => contest.name !== name);
		setContests(newContests);
		var tempDeletedContests = deletedContests;
		tempDeletedContests.push(name);

		setDeletedContests(tempDeletedContests);

		setDeletedContestsDB(tempDeletedContests);
		setMyContestsDB(newContests);
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

		var updatedDefaultDailyChallengeData = tempDailyChallengeData.platform;

		setSubscriptionStatusDB(temp);
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
