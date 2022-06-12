import localforage from "localforage";
import React from "react";
import { useState, useEffect } from "react";
const ContestContext = React.createContext();
// For browser apis
var browser = require("webextension-polyfill");

var defaultSubscription = {
	// 1: CP 2: Luv baber 0. Unsubscribe
	dailyChallenge: 1,
	HackerEarth: true,
	AtCoder: true,
	CodeChef: true,
	LeetCode: true,
	"Kick Start": true,
	CodeForces: true,
	TopCoder: true,
	HackerRank: true,
};

var defaultAutoOpen = [];
var deletedContestsGlob = [];

const fetchAllMyContests = async () => {
	var contests = await localforage.getItem("contests");
	var deletedContests = await localforage.getItem("deletedContests");
	if (deletedContests === null) deletedContests = [];

	var subscribed = await localforage.getItem("subscribed");
	if (subscribed === null) {
		subscribed = defaultSubscription;
		localforage.setItem("subscribed", subscribed);
	} else defaultSubscription = subscribed;

	var autoOpen = await localforage.getItem("autoOpen");
	if (autoOpen === null) {
		autoOpen = defaultAutoOpen;
		localforage.setItem("autoOpen", autoOpen);
	} else defaultAutoOpen = autoOpen;

	console.log("deletedContests", deletedContests);
	deletedContestsGlob = deletedContests;
	contests = contests.filter(
		(contest) => !deletedContests.includes(contest.name)
	);

	return [...contests];
};

// Add condition for is subscribed here and we can maintain the list of subscribed sites
const handleFilterContests = (contests, subscribed) => {
	// console.log("Function called");
	const ongoing = [],
		upcoming = [],
		today = [];
	contests.forEach((contest) => {
		const now = new Date();
		const start_time = new Date(contest.start_time);
		const end_time = new Date(contest.end_time);

		if (subscribed[contest.site]) {
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
// const defaultContests = [];
const ContestProvider = ({ children }) => {
	const [contests, setContests] = useState([]);
	const [subscribed, setSubscribed] = useState(defaultSubscription);
	const [filteredContests, setFilteredContests] = useState({
		ongoing: [],
		upcoming: [],
		today: [],
	});

	const [autoOpen, setAutoOpen] = useState(defaultAutoOpen);

	useEffect(() => {
		setFilteredContests(handleFilterContests(contests, subscribed));
	}, [subscribed, contests]);

	useEffect(() => {
		const fetchContests = async () => {
			var result = await fetchAllMyContests();
			if (result) {
				setContests(result);
				setSubscribed(defaultSubscription);
			}
		};
		fetchContests();
	}, []);

	// Delete contest if it is in the past
	const deleteContest = (name) => {
		const newContests = [...contests];
		const index = newContests.findIndex((contest) => contest.name === name);
		newContests.splice(index, 1);
		// Addding to deleted contests
		deletedContestsGlob.push(name);
		localforage.setItem("deletedContests", deletedContestsGlob);
		setContests(newContests);
	};

	const changeSubStatus = (site) => {
		console.log("site", site);
		var temp = { ...subscribed };
		temp[site] = !temp[site];
		console.log(temp);
		localforage.setItem("subscribed", temp);
		setSubscribed(temp);
	};
	const changeDailyChallenge = (new_status) => {
		var temp = { ...subscribed };
		temp["dailyChallenge"] = new_status;
		localforage.setItem("subscribed", temp);
		setSubscribed(temp);
	};

	const changeAutoOpen = (contest) => {
		var temp = [...autoOpen];
		var index = temp.indexOf(contest.name);

		if (index > -1) {
			console.log(contest.name);
			temp.splice(index, 1);
			browser.alarms.clear(contest.name);
		} else {
			temp.push(contest.name);

			var d = contest.start_time;
			if (contest.site === "code_chef") {
				// the end of the string contains a time zone code like "UTC",
				// so we need to replace it with ".000Z"
				d = d.replace(" UTC", ".000Z");
				// console.log("CodeChef date string d: " + d);
			}
			var date = new Date(d);

			console.log(date);
			var now = new Date();

			var time_diff = Math.abs(date.getTime() - now.getTime());
			time_diff = time_diff - 300000;
			// localforage.setItem("AlarmContests", AlarmContests);
			browser.alarms.create(contest.name, {
				when: Date.now() + time_diff,
			});
			console.log("Reminder is set after " + time_diff);
		}
		console.log(temp);
		setAutoOpen(temp);
	};

	return (
		<ContestContext.Provider
			value={{
				ongoing: filteredContests.ongoing,
				upcoming: filteredContests.upcoming,
				today: filteredContests.today,
				subscribed,
				deleteContest,
				autoOpen,
				changeSubStatus,
				changeDailyChallenge,
				changeAutoOpen,
			}}
		>
			{children}
		</ContestContext.Provider>
	);
};

export default ContestProvider;

export { ContestContext };
