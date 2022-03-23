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
		name: "DevRev Hackathon - Coding with AI",
		url: "https://www.hackerearth.com/challenges/hackathon/devrev-hackathon-coding-with-ai/",
		start_time: "2022-01-05T14:00:00.000Z",
		end_time: "2022-03-31T21:00:00.000Z",
		duration: "7369200.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "Capillary Technologies Senior Software Engineer Hiring Challenge",
		url: "https://www.hackerearth.com/challenges/hiring/capillary-technologies-senior-software-engineer-hiring-challenge/",
		start_time: "2022-03-04T12:30:00.000Z",
		end_time: "2022-03-20T18:25:00.000Z",
		duration: "1403700.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "DevOps Engineer - Airbus",
		url: "https://www.hackerearth.com/challenges/hiring/airbus-wonderhacks-1-devops-support-engineer/",
		start_time: "2022-03-04T12:30:00.000Z",
		end_time: "2022-03-20T18:25:00.000Z",
		duration: "1403700.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "Application Integration Engineer - Airbus",
		url: "https://www.hackerearth.com/challenges/hiring/airbus-wonderhacks-10-application-integration-engineer/",
		start_time: "2022-03-04T12:30:00.000Z",
		end_time: "2022-03-20T18:25:00.000Z",
		duration: "1403700.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "Functional Analyst - Airbus",
		url: "https://www.hackerearth.com/challenges/hiring/airbus-wonderhacks-10-functional-analyst/",
		start_time: "2022-03-04T12:30:00.000Z",
		end_time: "2022-03-20T18:25:00.000Z",
		duration: "1403700.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "Python Developer - Airbus",
		url: "https://www.hackerearth.com/challenges/hiring/airbus-wonderhacks-10-python-developer/",
		start_time: "2022-03-04T12:30:00.000Z",
		end_time: "2022-03-20T18:25:00.000Z",
		duration: "1403700.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "Full Stack .Net Developer - Airbus",
		url: "https://www.hackerearth.com/challenges/hiring/airbus-wonderhacks-10-full-stack-developer-net/",
		start_time: "2022-03-04T12:30:00.000Z",
		end_time: "2022-03-20T18:25:00.000Z",
		duration: "1403700.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "Amdocs hackfest 2022",
		url: "https://www.hackerearth.com/challenges/competitive/amdocs-hackfest-2022/",
		start_time: "2022-03-05T06:00:00.000Z",
		end_time: "2022-03-21T00:30:00.000Z",
		duration: "1362600.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "Nationwide Hackathon",
		url: "https://www.hackerearth.com/challenges/hackathon/nationwide-hackathon/",
		start_time: "2022-03-07T14:00:00.000Z",
		end_time: "2022-03-20T21:00:00.000Z",
		duration: "1148400.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "Women In Ctrl",
		url: "https://www.hackerearth.com/challenges/hiring/women-in-ctrl/",
		start_time: "2022-03-08T12:00:00.000Z",
		end_time: "2022-03-20T18:25:00.000Z",
		duration: "1059900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "DevSecOps Engineer - Airbus",
		url: "https://www.hackerearth.com/challenges/hiring/devsecops-airbus/",
		start_time: "2022-03-09T12:30:00.000Z",
		end_time: "2022-03-20T18:25:00.000Z",
		duration: "971700.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "ION<athon> 1.0",
		url: "https://ion-athon.hackerearth.com/",
		start_time: "2022-03-09T18:30:00.000Z",
		end_time: "2022-03-27T18:29:00.000Z",
		duration: "1555140.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "Lead Tech  Analyst - Airbus",
		url: "https://www.hackerearth.com/challenges/hiring/lead-tech-analyst-airbus/",
		start_time: "2022-03-10T12:30:00.000Z",
		end_time: "2022-03-20T18:25:00.000Z",
		duration: "885300.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "R.I.S.E. – Research. Innovate. Solve. Excel.",
		url: "https://www.hackerearth.com/challenges/competitive/sony-research-indias-rise/",
		start_time: "2022-03-11T12:30:00.000Z",
		end_time: "2022-03-20T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "PGP Glass Data Engineer Hiring Challenge",
		url: "https://www.hackerearth.com/challenges/hiring/pgp-glass-data-engineer-hiring-challenge/",
		start_time: "2022-03-11T12:30:00.000Z",
		end_time: "2022-03-20T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "Business Analyst and Senior Business Analyst Hiring Challenge",
		url: "https://www.hackerearth.com/challenges/hiring/impact-analytics-business-analyst-hiring-challenge/",
		start_time: "2022-03-11T12:30:00.000Z",
		end_time: "2022-03-20T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "The Fraud Buster Hiring Challenge",
		url: "https://www.hackerearth.com/challenges/hiring/the-fraud-buster-hiring-challenge/",
		start_time: "2022-03-11T12:30:00.000Z",
		end_time: "2022-03-20T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "IDP Python Development",
		url: "https://www.hackerearth.com/challenges/hiring/Idp-education-software-development-engineer-python-hiring-challenge/",
		start_time: "2022-03-11T12:30:00.000Z",
		end_time: "2022-03-20T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "Great Learning Data Engineer Admission Challenge",
		url: "https://www.hackerearth.com/challenges/competitive/great-learning-data-engineer-admission-challenge/",
		start_time: "2022-03-11T12:30:00.000Z",
		end_time: "2022-03-20T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "TradeCred Frontend Developer Hiring Challenge",
		url: "https://www.hackerearth.com/challenges/hiring/tradecred-frontend-developer-hiring-challenge/",
		start_time: "2022-03-11T12:30:00.000Z",
		end_time: "2022-03-20T18:29:00.000Z",
		duration: "799140.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "Citi Dev Challenge – Robot Uprising!",
		url: "https://www.hackerearth.com/challenges/hackathon/citi-dev-challenge-robot-uprising-el-levantamiento-de-los-robots/",
		start_time: "2022-03-14T11:00:00.000Z",
		end_time: "2022-03-16T02:59:00.000Z",
		duration: "143940.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "HACKBATTLE : Impact Through Data",
		url: "https://hackbattle-impact-through-data.hackerearth.com/",
		start_time: "2022-03-15T12:30:00.000Z",
		end_time: "2022-04-10T18:25:00.000Z",
		duration: "2267700.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "CODING",
	},
	{
		name: "Code Blooded 2.0",
		url: "https://www.codechef.com/CBLD2022",
		start_time: "2022-03-15 13:30:00 UTC",
		end_time: "2022-03-15 21:28:00 UTC",
		duration: "10800",
		site: "CodeChef",
		in_24_hours: "Yes",
		status: "BEFORE",
	},
	{
		name: "CodeChef Starters 30 (Rated for Div 2, 3, & 4)",
		url: "https://www.codechef.com/START30",
		start_time: "2022-03-16 14:30:00 UTC",
		end_time: "2022-03-16 17:30:00 UTC",
		duration: "10800",
		site: "CodeChef",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Zepto Business Analyst Hiring Challenge",
		url: "https://www.hackerearth.com/challenges/hiring/zepto-analytics-manager-hiring-challenge/",
		start_time: "2022-03-18T12:30:00.000Z",
		end_time: "2022-03-27T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Samsung Electro-Mechanics Software Engineer Hiring Challenge",
		url: "https://www.hackerearth.com/challenges/hiring/samsung-electro-mechanics-software-se-hiring-challenge/",
		start_time: "2022-03-18T12:30:00.000Z",
		end_time: "2022-03-27T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "AtCoder Regular Contest 137",
		url: "https://atcoder.jp/contests/arc137",
		start_time: "2022-03-19T12:00:00.000Z",
		end_time: "2022-03-19T14:00:00.000Z",
		duration: "7200",
		site: "AtCoder",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "March Lunchtime 2022 ",
		url: "https://www.codechef.com/LTIME106",
		start_time: "2022-03-19 14:30:00 UTC",
		end_time: "2022-03-19 17:30:00 UTC",
		duration: "10800",
		site: "CodeChef",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Biweekly Contest 74",
		url: "https://leetcode.com/contest/",
		start_time: "2022-03-19T14:30:00.000Z",
		end_time: "2022-03-19T16:00:00.000Z",
		duration: "5400",
		site: "LeetCode",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Weekly Contest 285",
		url: "https://leetcode.com/contest/",
		start_time: "2022-03-20T02:30:00.000Z",
		end_time: "2022-03-20T04:00:00.000Z",
		duration: "5400",
		site: "LeetCode",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Round A 2022",
		url: "https://codingcompetitions.withgoogle.com/kickstart/schedule",
		start_time: "2022-03-20T04:00:00.000Z",
		end_time: "2022-03-20T07:00:00.000Z",
		duration: "10800.0",
		site: "Kick Start",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Codeforces Round #778 (Div. 1 + Div. 2, based on Technocup 2022 Final Round)",
		url: "https://codeforces.com/contestRegistration/1654",
		start_time: "2022-03-20T11:35:00.000Z",
		end_time: "2022-03-20T13:50:00.000Z",
		duration: "8100",
		site: "CodeForces",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "AtCoder Beginner Contest 244",
		url: "https://atcoder.jp/contests/abc244",
		start_time: "2022-03-20T12:00:00.000Z",
		end_time: "2022-03-20T13:40:00.000Z",
		duration: "6000",
		site: "AtCoder",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Code Invicta'22",
		url: "https://www.codechef.com/CDIV2022",
		start_time: "2022-03-20 15:30:00 UTC",
		end_time: "2022-03-20 18:30:00 UTC",
		duration: "10800",
		site: "CodeChef",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Innov8 4 Kids Challenge",
		url: "https://innov8-4-kids.hackerearth.com/",
		start_time: "2022-03-21T04:00:00.000Z",
		end_time: "2022-04-10T14:00:00.000Z",
		duration: "1764000.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Educational Codeforces Round 125 (Rated for Div. 2)",
		url: "https://codeforces.com/contestRegistration/1657",
		start_time: "2022-03-22T14:35:00.000Z",
		end_time: "2022-03-22T16:35:00.000Z",
		duration: "7200",
		site: "CodeForces",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "CodeChef Starters 31",
		url: "https://www.codechef.com/START31",
		start_time: "2022-03-23 14:30:00 UTC",
		end_time: "2022-03-23 17:30:00 UTC",
		duration: "10800",
		site: "CodeChef",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Codeforces Round (Div. 1 + Div. 2)",
		url: "https://codeforces.com/contestRegistration/1656",
		start_time: "2022-03-24T14:35:00.000Z",
		end_time: "2022-03-24T16:35:00.000Z",
		duration: "7200",
		site: "CodeForces",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "March Long Two 2022 (Rated for Div 3 & 4)",
		url: "https://www.codechef.com/MARCH222",
		start_time: "2022-03-25 09:30:00 UTC",
		end_time: "2022-03-28 09:30:00 UTC",
		duration: "259200",
		site: "CodeChef",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "NatWest Java Developer Hiring Challenge",
		url: "https://www.hackerearth.com/challenges/hiring/natwest-java-developer-hiring-challenge/",
		start_time: "2022-03-25T12:30:00.000Z",
		end_time: "2022-04-10T18:25:00.000Z",
		duration: "1403700.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Infrastructure-Consultant Hiring Challenge - Women Graduates",
		url: "https://www.hackerearth.com/challenges/hiring/thoughtworks-infra-consultant-hiring-challenge-3/",
		start_time: "2022-03-25T12:30:00.000Z",
		end_time: "2022-04-03T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Application Developer Hiring Challenge for Python Programmers",
		url: "https://www.hackerearth.com/challenges/hiring/python-developer-hiring-challenge-women-graduates/",
		start_time: "2022-03-25T12:30:00.000Z",
		end_time: "2022-04-03T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Omnicell Angular Developer Hiring Challenge",
		url: "https://www.hackerearth.com/challenges/hiring/omnicell-angular-developer-hiring-challenge/",
		start_time: "2022-03-25T12:30:00.000Z",
		end_time: "2022-04-03T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Incubyte Software Craftsperson Hiring Challenge",
		url: "https://www.hackerearth.com/challenges/hiring/incubyte-software-craftsperson-hiring-challenge/",
		start_time: "2022-03-25T12:30:00.000Z",
		end_time: "2022-04-03T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Monoxer Programming Contest 2022（AtCoder Heuristic Contest 009）",
		url: "https://atcoder.jp/contests/ahc009",
		start_time: "2022-03-26T06:00:00.000Z",
		end_time: "2022-03-26T10:00:00.000Z",
		duration: "14400",
		site: "AtCoder",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "AtCoder Beginner Contest 245",
		url: "https://atcoder.jp/contests/abc245",
		start_time: "2022-03-26T12:00:00.000Z",
		end_time: "2022-03-26T13:40:00.000Z",
		duration: "6000",
		site: "AtCoder",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Codeforces Round #779 (Div. 2)",
		url: "https://codeforces.com/contestRegistration/1658",
		start_time: "2022-03-27T14:35:00.000Z",
		end_time: "2022-03-27T16:35:00.000Z",
		duration: "7200",
		site: "CodeForces",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "CodeChef Starters 32",
		url: "https://www.codechef.com/START32",
		start_time: "2022-03-30 14:30:00 UTC",
		end_time: "2022-03-30 17:30:00 UTC",
		duration: "10800",
		site: "CodeChef",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "American Express Makeathon 2022",
		url: "https://american-express-makeathon-2022.hackerearth.com/",
		start_time: "2022-03-31T03:30:00.000Z",
		end_time: "2022-04-18T18:29:00.000Z",
		duration: "1609140.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "5ire - Hackathon",
		url: "https://5ire.hackerearth.com/",
		start_time: "2022-03-31T14:05:00.000Z",
		end_time: "2022-05-02T13:59:00.000Z",
		duration: "2764440.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Amazon Last Mile Coding Challenge 2022",
		url: "https://hackerrank.com/contests/amazon-last-mile-coding-challenge",
		start_time: "2022-03-31T22:00:00.000Z",
		end_time: "2022-04-01T22:00:00.000Z",
		duration: "86400.0",
		site: "HackerRank",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "CareStack SDE Hiring Challenge",
		url: "https://www.hackerearth.com/challenges/hiring/carestack-sde-II-hiring-challenge/",
		start_time: "2022-04-01T12:30:00.000Z",
		end_time: "2022-04-10T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "IDFC FIRST Bank_Women Only Challenge",
		url: "https://www.hackerearth.com/challenges/hiring/idfc-first-bank_women-only-challenge/",
		start_time: "2022-04-01T12:30:00.000Z",
		end_time: "2022-04-17T18:25:00.000Z",
		duration: "1403700.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Cloud Fest Hackathon 1",
		url: "https://www.hackerearth.com/challenges/hackathon/cloud-fest-hackathon-i-presented-by-google-cloud/",
		start_time: "2022-04-01T12:30:00.000Z",
		end_time: "2022-04-24T18:25:00.000Z",
		duration: "2008500.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Trellix C++/Java Engineer Hiring Challenge",
		url: "https://www.hackerearth.com/challenges/hiring/trellix-java-C-engineer-hiring-challenge/",
		start_time: "2022-04-01T12:30:00.000Z",
		end_time: "2022-04-10T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Amazon Devices Embedded SDE Hiring Challenge",
		url: "https://www.hackerearth.com/challenges/hiring/amazon-embedded-sde-hiring-challenge-2/",
		start_time: "2022-04-01T12:30:00.000Z",
		end_time: "2022-04-17T18:25:00.000Z",
		duration: "1403700.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Technology Leaders Code@thon",
		url: "https://www.hackerearth.com/challenges/competitive/technology-leaders-code-thon/",
		start_time: "2022-04-01T12:30:00.000Z",
		end_time: "2022-04-10T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "April Cook-Off 2022",
		url: "https://www.codechef.com/COOK140",
		start_time: "2022-04-02 14:30:00 UTC",
		end_time: "2022-04-02 17:00:00 UTC",
		duration: "9000",
		site: "CodeChef",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "International Fraud Group",
		url: "https://www.hackerearth.com/challenges/hackathon/ifg-x-traffik-analysis-hub-hackathon-2022/",
		start_time: "2022-04-04T10:00:00.000Z",
		end_time: "2022-04-17T12:00:00.000Z",
		duration: "1130400.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "2022 Circle Hackathon",
		url: "https://circle.hackerearth.com/",
		start_time: "2022-04-04T14:00:00.000Z",
		end_time: "2022-04-17T23:00:00.000Z",
		duration: "1155600.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "CodeChef Starters 33",
		url: "https://www.codechef.com/START33",
		start_time: "2022-04-06 14:30:00 UTC",
		end_time: "2022-04-06 17:30:00 UTC",
		duration: "10800",
		site: "CodeChef",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Citi Digital Innovation Challenge",
		url: "https://citi-digital-innovation-challenge.hackerearth.com/",
		start_time: "2022-04-07T04:30:00.000Z",
		end_time: "2022-05-01T18:29:00.000Z",
		duration: "2123940.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "NatWest QA Engineer Hiring Challenge",
		url: "https://www.hackerearth.com/challenges/hiring/natwest-qa-engineer-hiring-challenge/",
		start_time: "2022-04-08T12:30:00.000Z",
		end_time: "2022-04-17T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "<She_Codes_2022>",
		url: "https://www.hackerearth.com/challenges/hiring/hackherthon/",
		start_time: "2022-04-08T12:30:00.000Z",
		end_time: "2022-04-17T18:25:00.000Z",
		duration: "798900.0",
		site: "HackerEarth",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "April Long 2022 - I (Rated for Div 3 and Div 4)",
		url: "https://www.codechef.com/APRIL221",
		start_time: "2022-04-08 14:30:00 UTC",
		end_time: "2022-04-11 14:30:00 UTC",
		duration: "259200",
		site: "CodeChef",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Daiwa Securities Co. Ltd. Programming Contest 2022 Spring（AtCoder Regular Contest 138）",
		url: "https://atcoder.jp/contests/arc138",
		start_time: "2022-04-09T12:00:00.000Z",
		end_time: "2022-04-09T14:00:00.000Z",
		duration: "7200",
		site: "AtCoder",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "CodeChef Starters 34 ",
		url: "https://www.codechef.com/START34",
		start_time: "2022-04-13 14:30:00 UTC",
		end_time: "2022-04-13 17:30:00 UTC",
		duration: "10800",
		site: "CodeChef",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "April Lunchtime 2022  ",
		url: "https://www.codechef.com/LTIME107",
		start_time: "2022-04-16 14:30:00 UTC",
		end_time: "2022-04-16 17:30:00 UTC",
		duration: "10800",
		site: "CodeChef",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "TCO22 Algorithm Round 1A",
		url: "https://www.topcoder.com/challenges",
		start_time: "2022-04-16T16:00:00.000Z",
		end_time: "2022-04-16T18:00:00.000Z",
		duration: "7200.0",
		site: "TopCoder",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "CodeChef Starters 35",
		url: "https://www.codechef.com/START35",
		start_time: "2022-04-20 14:30:00 UTC",
		end_time: "2022-04-20 17:30:00 UTC",
		duration: "10800",
		site: "CodeChef",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Round B 2022",
		url: "https://codingcompetitions.withgoogle.com/kickstart/schedule",
		start_time: "2022-04-23T23:00:00.000Z",
		end_time: "2022-04-24T02:00:00.000Z",
		duration: "10800.0",
		site: "Kick Start",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "TCO22 Algorithm Round 1B",
		url: "https://www.topcoder.com/challenges",
		start_time: "2022-04-27T11:00:00.000Z",
		end_time: "2022-04-27T13:00:00.000Z",
		duration: "7200.0",
		site: "TopCoder",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "TCO22 Algorithm Round 2A",
		url: "https://www.topcoder.com/challenges",
		start_time: "2022-05-21T16:00:00.000Z",
		end_time: "2022-05-21T18:00:00.000Z",
		duration: "7200.0",
		site: "TopCoder",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Round C 2022",
		url: "https://codingcompetitions.withgoogle.com/kickstart/schedule",
		start_time: "2022-05-22T11:00:00.000Z",
		end_time: "2022-05-22T14:00:00.000Z",
		duration: "10800.0",
		site: "Kick Start",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "TCO22 Algorithm Round 2B",
		url: "https://www.topcoder.com/challenges",
		start_time: "2022-06-01T11:00:00.000Z",
		end_time: "2022-06-01T13:00:00.000Z",
		duration: "7200.0",
		site: "TopCoder",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Coding Practice with Kick Start Session #2",
		url: "https://codingcompetitions.withgoogle.com/kickstart/schedule",
		start_time: "2022-06-27T16:00:00.000Z",
		end_time: "2022-07-01T03:00:00.000Z",
		duration: "298800.0",
		site: "Kick Start",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "TCO22 Algorithm Round 3",
		url: "https://www.topcoder.com/challenges",
		start_time: "2022-07-07T11:00:00.000Z",
		end_time: "2022-07-07T13:00:00.000Z",
		duration: "7200.0",
		site: "TopCoder",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Round D 2022",
		url: "https://codingcompetitions.withgoogle.com/kickstart/schedule",
		start_time: "2022-07-10T05:00:00.000Z",
		end_time: "2022-07-10T08:00:00.000Z",
		duration: "10800.0",
		site: "Kick Start",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "TCO22 Algorithm Round 4",
		url: "https://www.topcoder.com/challenges",
		start_time: "2022-07-30T16:00:00.000Z",
		end_time: "2022-07-30T18:00:00.000Z",
		duration: "7200.0",
		site: "TopCoder",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Round E 2022",
		url: "https://codingcompetitions.withgoogle.com/kickstart/schedule",
		start_time: "2022-08-21T03:30:00.000Z",
		end_time: "2022-08-21T06:30:00.000Z",
		duration: "10800.0",
		site: "Kick Start",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Coding Practice with Kick Start Session #3",
		url: "https://codingcompetitions.withgoogle.com/kickstart/schedule",
		start_time: "2022-08-29T16:00:00.000Z",
		end_time: "2022-09-02T03:00:00.000Z",
		duration: "298800.0",
		site: "Kick Start",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Round F 2022",
		url: "https://codingcompetitions.withgoogle.com/kickstart/schedule",
		start_time: "2022-09-18T17:00:00.000Z",
		end_time: "2022-09-18T20:00:00.000Z",
		duration: "10800.0",
		site: "Kick Start",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Round G 2022",
		url: "https://codingcompetitions.withgoogle.com/kickstart/schedule",
		start_time: "2022-10-15T12:00:00.000Z",
		end_time: "2022-10-15T15:00:00.000Z",
		duration: "10800.0",
		site: "Kick Start",
		in_24_hours: "No",
		status: "BEFORE",
	},
	{
		name: "Round H 2022",
		url: "https://codingcompetitions.withgoogle.com/kickstart/schedule",
		start_time: "2022-11-12T03:00:00.000Z",
		end_time: "2022-11-12T06:00:00.000Z",
		duration: "10800.0",
		site: "Kick Start",
		in_24_hours: "No",
		status: "BEFORE",
	},
];

const filterContest = (contests) => {
	const ongoing = [],
		upcoming = [],
		today = [];
	contests.forEach((contest) => {
		const now = new Date();
		const start_time = new Date(contest.start_time);
		const end_time = new Date(contest.end_time);

		if (now < start_time && start_time - now < 86400000) {
			today.push(contest);
		} else if (now < start_time) {
			upcoming.push(contest);
		} else if (now <= end_time && now >= start_time) {
			ongoing.push(contest);
		}
	});

	return { ongoing, upcoming, today };
};

const ContestProvider = ({ children }) => {
	// const [contests, setContests] = useState(defaultContest);
	const filteredContests = filterContest(defaultContest);
	const [ongoing, setOngoing] = useState(filteredContests.ongoing);
	const [upcoming, setUpcoming] = useState(filteredContests.upcoming);
	const [today, setToday] = useState(filteredContests.today);
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
	return (
		<ContestContext.Provider
			value={{
				ongoing,
				upcoming,
				today,
				deleteContest,
			}}
		>
			{children}
		</ContestContext.Provider>
	);
};

export default ContestProvider;

export { ContestContext };
