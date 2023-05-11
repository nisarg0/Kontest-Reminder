import React from "react";
import { useState } from "react";
const ContestContext = React.createContext();

const defaultContest = [
	{
		name: "ProjectEuler+",
		url: "https://hackerrank.com/contests/projecteuler",
		start_time: "2014-07-07T15:38:00.000Z",
		end_time: "2024-07-30T18:30:00.000Z",
		duration: "317616720.0",
		site: "HackerRank",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "1v1 Games by CodeChef",
		url: "https://www.codechef.com/GAMES",
		start_time: "2022-10-10 06:30:00 UTC",
		end_time: "2032-10-10 06:30:00 UTC",
		duration: "315619200.0",
		site: "CodeChef",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "HCL Volt MX Hackathon 2023",
		url: "https://voltmx.hackerearth.com/de/",
		start_time: "2023-03-13T19:00:00.000Z",
		end_time: "2023-05-15T06:59:00.000Z",
		duration: "5399940.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "Consensus 2023 Hackathon",
		url: "https://web3athon2023.hackerearth.com/de/",
		start_time: "2023-04-17T04:00:00.000Z",
		end_time: "2023-06-01T03:59:00.000Z",
		duration: "3887940.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "Tectone23 Hacks",
		url: "https://www.hackerearth.com/de/challenges/hackathon/tectone23-hacks/",
		start_time: "2023-04-24T13:39:00.000Z",
		end_time: "2023-05-19T18:25:00.000Z",
		duration: "2177160.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "Romanian IOI Selection 2023 - Day 2",
		url: "https://csacademy.com/contest/romanian-ioi-selection-2023-day-2",
		start_time: "2023-05-11T07:30:00.000Z",
		end_time: "2023-05-11T12:30:00.000Z",
		duration: "18000",
		site: "CS Academy",
		in_24_hours: "Yes",
		status: "BEFORE",
	},
	{
		name: "Velotio Software Engineer Hiring Challenge 2023",
		url: "https://www.hackerearth.com/de/challenges/hiring/velotio-software-engineer-hiring-challenge-2023/",
		start_time: "2023-05-12T12:30:00.000Z",
		end_time: "2023-05-22T00:25:00.000Z",
		duration: "820500.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Tiger Analytics Tech Stack Challenge",
		url: "https://www.hackerearth.com/de/challenges/hiring/tigeranalytics_tech_stack_challenge/",
		start_time: "2023-05-12T12:30:00.000Z",
		end_time: "2023-05-21T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Educational Codeforces Round 148 (Rated for Div. 2)",
		url: "https://codeforces.com/contestRegistration/1832",
		start_time: "2023-05-12T14:35:00.000Z",
		end_time: "2023-05-12T16:35:00.000Z",
		duration: "7200",
		site: "CodeForces",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "パナソニックグループプログラミングコンテスト2023（AtCoder Beginner Contest 301）",
		url: "https://atcoder.jp/contests/abc301",
		start_time: "2023-05-13T12:00:00.000Z",
		end_time: "2023-05-13T13:40:00.000Z",
		duration: "6000",
		site: "AtCoder",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Biweekly Contest 104",
		url: "https://leetcode.com/contest/biweekly-contest-104",
		start_time: "2023-05-13T14:30:00.000Z",
		end_time: "2023-05-13T16:00:00.000Z",
		duration: "5400",
		site: "LeetCode",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Weekly Contest 345",
		url: "https://leetcode.com/contest/weekly-contest-345",
		start_time: "2023-05-14T02:30:00.000Z",
		end_time: "2023-05-14T04:00:00.000Z",
		duration: "5400",
		site: "LeetCode",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "AtCoder Regular Contest 160",
		url: "https://atcoder.jp/contests/arc160",
		start_time: "2023-05-14T12:00:00.000Z",
		end_time: "2023-05-14T14:00:00.000Z",
		duration: "7200",
		site: "AtCoder",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Codeforces Round (Div. 2)",
		url: "https://codeforces.com/contestRegistration/1828",
		start_time: "2023-05-14T14:35:00.000Z",
		end_time: "2023-05-14T16:35:00.000Z",
		duration: "7200",
		site: "CodeForces",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Codeforces Round (Div. 1)",
		url: "https://codeforces.com/contestRegistration/1827",
		start_time: "2023-05-14T14:35:00.000Z",
		end_time: "2023-05-14T16:35:00.000Z",
		duration: "7200",
		site: "CodeForces",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "LGBTQIA+ Matters",
		url: "https://www.hackerearth.com/de/challenges/hackathon/lgbtqia-matters/",
		start_time: "2023-05-17T10:00:00.000Z",
		end_time: "2023-05-17T12:00:00.000Z",
		duration: "7200.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Starters 90",
		url: "https://www.codechef.com/START90",
		start_time: "2023-05-17 14:30:00 UTC",
		end_time: "2023-05-17 16:30:00 UTC",
		duration: "7200",
		site: "CodeChef",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Ennovate- Coding Challenge 2023",
		url: "https://ennovate.hackerearth.com/de/",
		start_time: "2023-05-18T22:12:00.000Z",
		end_time: "2023-06-17T17:30:00.000Z",
		duration: "2575080.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Codeforces Round (Div. 3)",
		url: "https://codeforces.com/contestRegistration/1833",
		start_time: "2023-05-19T14:35:00.000Z",
		end_time: "2023-05-19T16:50:00.000Z",
		duration: "8100",
		site: "CodeForces",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "AtCoder Grand Contest 062",
		url: "https://atcoder.jp/contests/agc062",
		start_time: "2023-05-21T12:00:00.000Z",
		end_time: "2023-05-21T15:00:00.000Z",
		duration: "10800",
		site: "AtCoder",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Starters 91",
		url: "https://www.codechef.com/START91",
		start_time: "2023-05-24 14:30:00 UTC",
		end_time: "2023-05-24 16:30:00 UTC",
		duration: "7200",
		site: "CodeChef",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Frontend Developer Hiring Challenge - Impact Analytics",
		url: "https://www.hackerearth.com/de/challenges/hiring/frontend-developer-hiring-challenge-impact-analytics/",
		start_time: "2023-05-26T12:30:00.000Z",
		end_time: "2023-06-04T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "日鉄ソリューションズプログラミングコンテスト2023（AtCoder Beginner Contest 303）",
		url: "https://atcoder.jp/contests/abc303",
		start_time: "2023-05-27T12:00:00.000Z",
		end_time: "2023-05-27T13:40:00.000Z",
		duration: "6000",
		site: "AtCoder",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Codeforces Round (Div. 2)",
		url: "https://codeforces.com/contestRegistration/1831",
		start_time: "2023-05-27T14:35:00.000Z",
		end_time: "2023-05-27T16:35:00.000Z",
		duration: "7200",
		site: "CodeForces",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Codeforces Round (Div. 1)",
		url: "https://codeforces.com/contestRegistration/1830",
		start_time: "2023-05-27T14:35:00.000Z",
		end_time: "2023-05-27T16:35:00.000Z",
		duration: "7200",
		site: "CodeForces",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "AtCoder Regular Contest 161",
		url: "https://atcoder.jp/contests/arc161",
		start_time: "2023-05-28T12:00:00.000Z",
		end_time: "2023-05-28T14:00:00.000Z",
		duration: "7200",
		site: "AtCoder",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Starters 92",
		url: "https://www.codechef.com/START92",
		start_time: "2023-05-31 14:30:00 UTC",
		end_time: "2023-05-31 16:30:00 UTC",
		duration: "7200",
		site: "CodeChef",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "American Express Makeathon 2023",
		url: "https://www.hackerearth.com/de/challenges/hackathon/american-express-makeathon-2023/",
		start_time: "2023-06-02T12:30:00.000Z",
		end_time: "2023-06-18T18:29:00.000Z",
		duration: "1403940.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "ALGO ARTIS Programming Contest 2023（AtCoder Heuristic Contest 020）",
		url: "https://atcoder.jp/contests/ahc020",
		start_time: "2023-06-11T06:00:00.000Z",
		end_time: "2023-06-11T10:00:00.000Z",
		duration: "14400",
		site: "AtCoder",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "inCode 2023 — Challenging injustice",
		url: "https://www.hackerearth.com/de/challenges/hackathon/incode-2023-challenging-injustice/",
		start_time: "2023-06-18T21:00:00.000Z",
		end_time: "2023-07-09T20:59:00.000Z",
		duration: "1814340.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
];

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

const defaultSubscribtion = {
	// true: leetcode false: gfg
	dailyChallenge: true,
	HackerEarth: true,
	AtCoder: true,
	CodeChef: true,
	LeetCode: true,
	"Kick Start": false,
	CodeForces: true,
	TopCoder: true,
	HackerRank: true,
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

const ContestProvider = ({ children }) => {
	// const [contests, setContests] = useState(defaultContest);
	const [subscribed, setSubscribed] = useState(defaultSubscribtion);
	const filteredContests = filterContest(defaultContest, subscribed);
	const [ongoing, setOngoing] = useState(filteredContests.ongoing);
	const [upcoming, setUpcoming] = useState(filteredContests.upcoming);
	const [today, setToday] = useState(filteredContests.today);
	const [dailyChallenge, setDailyChallenge] = useState(
		defaultDailyChallenge.geeksforgeeks
	);

	// Delete contest if it is in the past
	const deleteContest = (name, type) => {
		if (type === "ongoing") {
			const newContests = ongoing.filter((contest) => contest.name !== name);
			setOngoing(newContests);
		} else if (type === "upcoming") {
			const newContests = upcoming.filter((contest) => contest.name !== name);
			setUpcoming(newContests);
		} else {
			const newContests = today.filter((contest) => contest.name !== name);
			setToday(newContests);
		}
	};

	// const dailyChallenge = (dailyChallengePlatformList) => { subscribed.dailyChallenge
	// 	? defaultDailyChallenge.geeksforgeeks
	// 	: defaultContest.leetcode;
	// }

	const changeSubStatus = (site) => {
		var temp = { ...subscribed };
		temp[site] = !temp[site];
		setSubscribed(temp);
	};
	const changeDailyChallenge = () => {
		var temp = { ...subscribed };
		temp.dailyChallenge = !temp.dailyChallenge;

		console.log("temp: ", temp);

		var tempDailyChallengeData = temp.dailyChallenge
			? defaultDailyChallenge.geeksforgeeks
			: defaultDailyChallenge.leetcode;

		console.log("tempDailyChallengeData: ", tempDailyChallengeData);

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
