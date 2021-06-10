import axios from "axios";
import React, { useState, useEffect } from "react";
import localforage, { removeItem } from "localforage";
import { getAllByPlaceholderText } from "@testing-library/dom";
import "./Subscribe.css";
import { Route } from "react-router";
import { render } from "@testing-library/react";
import NavigationBar from "./NavigationBar";
import { Card, CardContent, Typography, Button } from "@material-ui/core";

let deletedContests = [];
let AlarmContests = [];

export default function MyContest() {
	//let contest=[]
	//contest=contests_in_24_hours(myContests_db)
	//console.log(contest)
	const [currentContest, setcurrentContest] = useState("24hours");
	const [mycontest, setmycontest] = useState([]);
	const [temp_contest, settemp_contest] = useState([]);
	// const [color, setcolor] = useState([]);
	// let selected: "";
	// console.log(mycontest);
	//setmycontest(contest24 => contest24= myContests_db)
	useEffect(() => {
		// console.log("here in useEffect");
		const GetData = async () =>
			localforage.getItem("myContests", function (err, value) {
				if (err) console.log(err);
				setmycontest(contests_in_24_hours(value));
				settemp_contest(value);
				//settemp_contest(value)
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
		let delcontest = [...temp_contest];
		for (var i = 0; i < temp_contest.length; i++) {
			if (dcontest == delcontest[i]) {
				delcontest.splice(i, 1);
				break;
			}
		}

		switch (currentContest) {
			case "24hours": {
				setmycontest(contests_in_24_hours(delcontest));
				break;
			}
			case "ongoing": {
				setmycontest(ongoing(delcontest));
				break;
			}
			case "upcoming": {
				setmycontest(upcoming(delcontest));
				break;
			}
		}
		// console.log(delcontest);
		saveMyContest(delcontest);
		settemp_contest(delcontest);
		// setmycontest(delcontest);
	};

	// Opens new tab with given uri
	function openLink(uri) {
		chrome.tabs.create({ active: true, url: uri });
	}

	// Open Calander
	function openCalander(contest) {
		console.log("In Calander");
		function ISODateString(d) {
			var isoDate = d.toISOString();
			isoDate = isoDate.replaceAll(":", "");
			isoDate = isoDate.replaceAll("-", "");
			var retval = isoDate.split(".")[0];
			return retval + "Z";
		}

		var start = new Date(contest.start_time);
		var end = new Date(contest.end_time);
		// console.log(start.toISOString());
		var uri = `http://www.google.com/calendar/event?action=TEMPLATE&text=${
			contest.name
		}&dates=${ISODateString(start)}/${ISODateString(
			end
		)}&details=Your remainder is set by CP-Schedular. Contest URL : ${
			contest.url
		}`;
		console.log(uri);
		console.log(ISODateString(start));
		chrome.tabs.create({ active: true, url: uri });
	}
	function toggleAlarm(event, contest) {
		var isAlarmSet = -1;

		for (var i = 0; i < AlarmContests.length; i++) {
			if (AlarmContests[i].name === contest.name) {
				isAlarmSet = i;
				break;
			}
		}

		if (isAlarmSet !== -1) {
			// Remove alarm
			AlarmContests.splice(isAlarmSet, 1);
			event.currentTarget.style.backgroundColor = "";

			localforage.setItem("AlarmContests", AlarmContests);
			chrome.alarms.clear(contest.name);
			console.log("Alarm Cleared");
		} else {
			AlarmContests.push(contest);
			event.currentTarget.style.backgroundColor = "#ffe066";
			//setcolour(contest)
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
		}
		console.log(AlarmContests);
	}

	function contests_in_24_hours(myContests_db) {
		//await getmyContests();
		var in_24_hours = [];
		for (var contest of myContests_db) {
			if (contest.in_24_hours === "Yes") in_24_hours.push(contest);
		}
		return in_24_hours;
	}
	function ongoing(myContests_db) {
		//await getmyContests();
		var Ongoing = [];
		for (var contest of myContests_db) {
			if (contest.status === "CODING") Ongoing.push(contest);
		}
		console.log(Ongoing);
		console.log(mycontest);
		return Ongoing;
	}
	function upcoming(myContests_db) {
		//await getmyContests();

		var Upcoming = [];
		for (var contest of myContests_db) {
			if (contest.status == "BEFORE" && contest.in_24_hours == "No")
				Upcoming.push(contest);
		}

		console.log(Upcoming);
		console.log(mycontest);
		return Upcoming;
	}

	// Db function
	async function saveMyContest(delcontest) {
		console.log("In saveMyContest");
		await localforage.setItem("myContests", delcontest);
	}
	// DB function
	async function setDeletedContests() {
		console.log("In setDeletedContests");
		await localforage.setItem("deletedContests", deletedContests);
	}

	const setcolour = (contest) => {
		let c;
		for (let i = 0; i < AlarmContests.length; i++) {
			if (AlarmContests[i].name == contest.name) {
				c = "yellow";
			}
		}
		return c;
	};

	{
		return (
			<div>
				<div className="Sections">
					<Button
						className="sections"
						onClick={() => {
							setmycontest(ongoing(temp_contest));
							setcurrentContest("ongoing");
						}}
						fontFamily="Helvetica Neue"
						style={{
							textTransform: "none",
							backgroundColor:
								currentContest === "ongoing"
									? "#fff"
									: "#343a40",
							color:
								currentContest === "ongoing" ? "#222" : "#fff",
							borderRadius: 0,
							outline: "none",
						}}
					>
						Ongoing
					</Button>
					<Button
						className="sections"
						onClick={() => {
							setmycontest(contests_in_24_hours(temp_contest));
							setcurrentContest("24hours");
						}}
						fontFamily="Helvetica Neue"
						style={{
							textTransform: "none",
							backgroundColor:
								currentContest === "24hours"
									? "#fff"
									: "#343a40",
							color:
								currentContest === "24hours" ? "#222" : "#fff",
							borderRadius: 0,
							outline: "none",
						}}
					>
						In 24 hours
					</Button>
					<Button
						className="sections"
						onClick={() => {
							setmycontest(upcoming(temp_contest));
							setcurrentContest("upcoming");
						}}
						fontFamily="Helvetica Neue"
						style={{
							textTransform: "none",
							backgroundColor:
								currentContest === "upcoming"
									? "#fff"
									: "#343a40",
							color:
								currentContest === "upcoming" ? "#222" : "#fff",
							borderRadius: 0,
							outline: "none",
						}}
					>
						Upcoming
					</Button>
				</div>

				{mycontest.map((contest, key) => (
					<div key={key}>
						<div className="card text-center">
							<div className="card-body">
								<h6>{contest.name}</h6>
								<h6 className="card-text">
									Start:{getDate(contest.start_time)}
								</h6>
								<div className="buttons">
									<button
										type="button"
										className="btn btn-primary btn-sm"
										onClick={() => openLink(contest.url)}
									>
										Go to Contest
									</button>

									<button
										type="button"
										className="btn btn-primary btn-sm btn-circle"
										onClick={() => openCalander(contest)}
									>
										<i className="bi bi-calendar-event"></i>
									</button>
									<button
										style={{
											backgroundColor: setcolour(contest),
										}}
										type="button"
										className="btn btn-primary btn-sm btn-circle"
										onClick={(e) => {
											toggleAlarm(e, contest);
											setcolour(contest);
										}}
									>
										<i className="bi bi-alarm-fill"></i>
									</button>
									<button
										type="button"
										className="btn btn-danger btn-sm btn-circle"
										onClick={() => deleteContest(contest)}
									>
										<i className="bi bi-trash-fill"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}
}

// ============================ Helper =================================
function getDate(d) {
	var date_temp = new Date(d);
	var date = date_temp.toLocaleString("en-US");
	var datearray = date.split("/");
	var newdate = datearray[1] + "/" + datearray[0] + "/" + datearray[2];
	return newdate;
}
