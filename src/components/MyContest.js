import axios from "axios";
import React, { useState, useEffect } from "react";
import localforage, { removeItem } from "localforage";
import { getAllByPlaceholderText } from "@testing-library/dom";
import "./Subscribe.css";
import { Route } from "react-router";
import { render } from "@testing-library/react";
import NavigationBar from "./NavigationBar";

let deletedContests = [];
let AlarmContests = [];

export default function MyContest() {
	//let contest=[]
	//contest=contests_in_24_hours(myContests_db)
	//console.log(contest)

	const [mycontest, setmycontest] = useState([]);
	// console.log(mycontest);
	//setmycontest(contest24 => contest24= myContests_db)
	useEffect(() => {
		// console.log("here in useEffect");
		const GetData = async () =>
			localforage.getItem("myContests", function (err, value) {
				if (err) console.log(err);
				setmycontest(value);
			});
		localforage.getItem("AlarmContests", function (err, value) {
			if (err) console.log(err);
			if (value === null) AlarmContests = [];
			else AlarmContests = value;
		});
		GetData();
	}, []);

	// 1. Add it to deleted and push it to storage
	// 2. delete the element from myContests and push new myContests to the storage
	const deleteContest = async (dcontest) => {
		deletedContests.push(dcontest);

		setDeletedContests();
		let delcontest = [...mycontest];
		for (var i = 0; i < mycontest.length; i++)
			if (dcontest == delcontest[i]) delcontest.splice(i, 1);

		// console.log(delcontest);
		setmyContests(delcontest);
		setmycontest(delcontest);
	};

	// Opens new tab with given uri
	function openLink(uri) {
		chrome.tabs.create({ active: true, url: uri });
	}

	// Open Calander
	// function openCalander(contest) {
	// 	function ISODateString(d) {
	// 		function pad(n) {
	// 			return n < 10 ? "0" + n : n;
	// 		}
	// 		return (
	// 			d.getUTCFullYear() +
	// 			"-" +
	// 			pad(d.getUTCMonth() + 1) +
	// 			"-" +
	// 			pad(d.getUTCDate()) +
	// 			"T" +
	// 			pad(d.getUTCHours()) +
	// 			":" +
	// 			pad(d.getUTCMinutes()) +
	// 			":" +
	// 			pad(d.getUTCSeconds()) +
	// 			"Z"
	// 		);
	// 	}

	// 	var start = new Date(contest.start_time);
	// 	var end = new Date(contest.end_time);
	// 	// console.log(start.toISOString());
	// 	var uri = `http://www.google.com/calendar/event?action=TEMPLATE&text=${
	// 		contest.name
	// 	}&dates=${ISODateString(start)}/20180513T030000Z&details=${
	// 		contest.url
	// 	}`;
	// 	chrome.tabs.create({ active: true, url: uri });
	// }

	// Adds an alarm for 1 min before contest
	function ContestAlarm(contest) {
		AlarmContests.push(contest);

		// console.log("In ContestAlarm");
		var date = new Date(contest.start_time);
		// console.log(date);
		var now = new Date();

		var time_diff = Math.abs(date.getTime() - now.getTime());
		time_diff = time_diff - 1;

		localforage.setItem("AlarmContests", AlarmContests);
		chrome.alarms.create(contest.name, {
			when: Date.now() + time_diff,
		});
		console.log("reminderSet after " + time_diff);
		console.log(AlarmContests);
	}

	// Db function
	async function setmyContests(delcontest) {
		console.log("In setmyContests");
		await localforage.setItem("myContests", delcontest);
	}
	// DB function
	async function setDeletedContests() {
		console.log("In setDeletedContests");
		await localforage.setItem("deletedContests", deletedContests);
	}

	{
		return (
			<div>
				{mycontest.map((contest, key) => (
					<div key={key}>
						<div className="card text-center">
							<h6 className="card-header">{contest.name}</h6>
							<div className="card-body">
								<h6 className="card-title">
									Start:{getDate(contest.start_time)}
								</h6>
								<button
									type="button"
									className="btn btn-primary btn-sm"
									onClick={() => openLink(contest.url)}
								>
									Go to Contest
								</button>
								<button
									type="button"
									className="btn btn-primary btn-sm"
									onClick={() => deleteContest(contest)}
								>
									<i className="bi bi-trash-fill"></i>
								</button>
								<button
									type="button"
									className="btn btn-primary btn-sm"
									onClick={() => openCalander(contest)}
								>
									<i className="bi bi-calendar-event"></i>
								</button>
								<button
									type="button"
									className="btn btn-primary btn-sm"
									onClick={() => ContestAlarm(contest)}
								>
									<i className="bi bi-alarm-fill"></i>
								</button>
							</div>
						</div>

						<br></br>
					</div>
				))}
			</div>
		);
	}
}

function contests_in_24_hours(myContests_db) {
	//await getmyContests();
	var in_24_hours = [];
	for (var contest of myContests_db) {
		if (contest.in_24_hours === "Yes") in_24_hours.push(contest);
	}
	return in_24_hours;
}

// ============================ Helper =================================
function getDate(d) {
	var date_temp = new Date(d);
	var date = date_temp.toLocaleString("en-US");
	var datearray = date.split("/");
	var newdate = datearray[1] + "/" + datearray[0] + "/" + datearray[2];
	return newdate;
}
