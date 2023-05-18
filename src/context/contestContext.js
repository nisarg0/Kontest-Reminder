import React, { useEffect } from "react";
import { useState } from "react";
import {
	setDeletedContestsDB,
	getDeletedContestsDB,
	getSubscriptionStatusDB,
	setMyContestsDB,
	getMyContestsDB,
	setSubscriptionStatusDB,
	getDailyChallengeDB,
	// setDailyChallengeDB,
} from "../Helper/DbHelper.js";

var browser = require("webextension-polyfill");

const ContestContext = React.createContext();

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
	const [isFirstRender, setIsFirstRender] = useState(true);
	const [contests, setContests] = useState([]);
	const [subscribed, setSubscribed] = useState([]);
	const [deletedContests, setDeletedContests] = useState([]);
	const [dailyChallenge, setDailyChallenge] = useState({});

	console.log("updated");
	let filteredContests = filterContest(contests, subscribed);
	let ongoing = filteredContests.ongoing;
	let upcoming = filteredContests.upcoming;
	let today = filteredContests.today;

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
			console.log(isFirstRender);
			setIsFirstRender(false);
			setContests(defaultContest);
			setSubscribed(defaultSubscribtion);
			setDeletedContestsDB(deletedContests);
		};
		fetchData();
	}, [isFirstRender]);

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

	const handleAutoOpen = (autoOpenContest) => {
		console.log("autoOpenContest", autoOpenContest);
		var tempContests = contests;

		// Update contest based upon autoOpenContest status
		// add contest to alarms as in previous state it was not added
		if (!autoOpenContest.autoOpen) {
			var d = autoOpenContest.start_time;
			if (autoOpenContest.site === "code_chef") {
				// the end of the string contains a time zone code like "UTC",
				// so we need to replace it with ".000Z"
				d = d.replace(" UTC", ".000Z");
				// console.log("CodeChef date string d: " + d);
			}
			var date = new Date(d);

			console.log(date);
			var now = new Date();

			var time_diff = Math.abs(date.getTime() - now.getTime());
			time_diff = time_diff - 300000; // 5 minutes before
			browser.alarms.create(autoOpenContest.name, {
				when: Date.now() + time_diff,
			});
			console.log("reminderSet after " + time_diff);
		} else {
			// add contest to alarms
			browser.alarms.clear(autoOpenContest.name);
			console.log("Alarm Cleared");
		}

		for (var contest of tempContests) {
			if (contest.name === autoOpenContest.name) {
				contest.autoOpen = !autoOpenContest.autoOpen;
				break;
			}
		}
		setContests([...tempContests]);
		setMyContestsDB(tempContests);
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
				handleAutoOpen,
				isFirstRender,
			}}
		>
			{children}
		</ContestContext.Provider>
	);
};

export default ContestProvider;

export { ContestContext };
