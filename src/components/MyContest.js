import React, { useState, useEffect } from "react";
import localforage from "localforage";
import "./Subscribe.css";
import { Button } from "@material-ui/core";

var browser = require("webextension-polyfill");

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
		const GetData = () =>
			localforage.getItem("myContests", function (err, value) {
				if (err) console.log(err);
				setmycontest(contests_in_24_hours(value));
				settemp_contest(value);
				//settemp_contest(value)
				console.log("DB MyContest :");
				console.log(value);
			});

		localforage.getItem("AlarmContests", function (err, value) {
			if (err) console.log(err);
			if (value === null) AlarmContests = [];
			else AlarmContests = value;
		});

		GetData();
	}, []);

	const deleteContest = async (dcontest) => {
		deletedContests.push(dcontest);

		setDeletedContests();
		let delcontest = [...temp_contest];
		for (var i = 0; i < temp_contest.length; i++) {
			if (dcontest === delcontest[i]) {
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
			default:
			//do nothing
		}
		// console.log(delcontest);
		saveMyContest(delcontest);
		settemp_contest(delcontest);
		// setmycontest(delcontest);
	};

	return (
		<div>
			<div className="Sections">
				<Button
					// variant="contained"
					className="sections"
					onClick={() => {
						setmycontest(ongoing(temp_contest));
						setcurrentContest("ongoing");
					}}
					fontFamily="Helvetica Neue"
					style={{
						textTransform: "none",
						backgroundColor: currentContest === "ongoing" ? "#fff" : "#343a40",
						color: currentContest === "ongoing" ? "#222" : "#fff",
						borderRadius: 0,
						outline: "none",
						display: "block",
					}}
				>
					Ongoing
				</Button>
				<Button
					// variant="contained"
					className="sections"
					onClick={() => {
						setmycontest(contests_in_24_hours(temp_contest));
						setcurrentContest("24hours");
					}}
					fontFamily="Helvetica Neue"
					style={{
						textTransform: "none",
						backgroundColor: currentContest === "24hours" ? "#fff" : "#343a40",
						color: currentContest === "24hours" ? "#222" : "#fff",
						borderRadius: 0,
						outline: "none",
						display: "block",
					}}
				>
					In 24 hours
				</Button>
				<Button
					// variant="contained"
					className="sections"
					onClick={() => {
						setmycontest(upcoming(temp_contest));
						setcurrentContest("upcoming");
					}}
					fontFamily="Helvetica Neue"
					style={{
						textTransform: "none",
						backgroundColor: currentContest === "upcoming" ? "#fff" : "#343a40",
						color: currentContest === "upcoming" ? "#222" : "#fff",
						borderRadius: 0,
						outline: "none",
						display: "block",
					}}
				>
					Upcoming
				</Button>
			</div>
			{mycontest?.length < 1 && (
				<div className="blank">
					{currentContest === "24hours"
						? "No contests in 24 hours"
						: `No ${currentContest} Contests`}
				</div>
			)}
			{mycontest?.length > 0 &&
				mycontest.map((contest, key) => (
					<div key={key} className="form">
						<div className="card text-center">
							<div className="card-body">
								<div className="card-info">
									<img
										style={{
											height: "60px",
											width: "60px",
										}}
										src={getImage(contest.site)}
										alt="{contest.site}"
									/>
									<div
										style={{
											flex: 1,
											alignSelf: "center",
										}}
									>
										<h6>{contest.name}</h6>

										<h6 className="card-text">
											<div>
												Start:
												{getDate(
													contest.start_time,
													contest.site === "code_chef"
												)}
												<p>
													End:
													{getDate(
														contest.end_time,
														contest.site === "code_chef"
													)}
												</p>
											</div>
										</h6>
									</div>
								</div>
								<div className="buttons">
									<button
										type="button"
										className="btn btn-primary btn-sm"
										onClick={() => openLink(contest.url)}
									>
										Go to Contest
									</button>
									{(currentContest === "24hours" ||
										currentContest === "upcoming") && (
										<button
											type="button"
											className="btn btn-primary btn-sm btn-circle"
											onClick={() => openCalander(contest)}
											data-toggle="tooltip"
											data-placement="bottom"
											title="Add to calendar"
										>
											<i className="bi bi-calendar-event"></i>
										</button>
									)}

									{(currentContest === "24hours" ||
										currentContest === "upcoming") && (
										<button
											style={{
												backgroundColor: setcolour(contest),
											}}
											type="button"
											className="btn btn-primary btn-sm btn-circle"
											onClick={(e) => {
												toggleAlarm(e, contest);
											}}
											data-toggle="tooltip"
											data-placement="bottom"
											title={
												setcolour(contest) === ""
													? "Add Reminder"
													: "Remove Reminder"
											}
										>
											<i className="bi bi-alarm-fill"></i>
										</button>
									)}

									<button
										type="button"
										className="btn btn-danger btn-sm btn-circle"
										onClick={() => deleteContest(contest)}
										data-toggle="tooltip"
										data-placement="bottom"
										title="Delete Contest"
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

// ============================ Helper =================================
function getDate(d, isCodeChef = false) {
	// CodeChef's parsing format is different and is of the form:
	// 2022-01-10 09:30:00 UTC
	// YYYY-MM-DD HH:MM:SS XXX
	// where XXX is the 3-letter time zone code.

	// The normal ISO format is:
	// 2022-01-10T05:30:00.000Z

	if (isCodeChef) {
		// the end of the string contains a time zone code like "UTC",
		// so we need to replace it with ".000Z"
		d = d.replace(" UTC", ".000Z");
		// console.log("CodeChef date string d: " + d);
	}
	var date_temp = new Date(d);
	var date = date_temp.toLocaleString("en-US");
	var datearray = date.split("/");
	var newdate = datearray[1] + "/" + datearray[0] + "/" + datearray[2];
	return newdate.replace(",", "    ");
}
// 1. Add it to deleted and push it to storage
// 2. delete the element from myContests and push new myContests to the storage

// Opens new tab with given uri
function openLink(uri) {
	browser.tabs.create({ active: true, url: uri });
}

// Open Calander
function openCalander(contest) {
	console.log("In Calander");
	function ISODateString(d) {
		console.log("In ISODateString");
		// var isoDate = d.toISOString();
		var isoDate = d;
		console.log("ISO Date initial: " + isoDate);
		isoDate = isoDate.replaceAll(":", "");
		isoDate = isoDate.replaceAll("-", "");
		console.log("ISO Date later: " + isoDate);
		var retval = isoDate.split(".")[0] + "Z";
		console.log("ISO Date retval: " + retval);
		return retval;
		// return retval + "Z";
	}

	var start = contest.start_time;
	var end = contest.end_time;
	console.log("start:" + start);
	console.log("end:" + end);

	var uri = `http://www.google.com/calendar/event?action=TEMPLATE&text=${encodeURIComponent(
		contest.name
	)}&dates=${ISODateString(start)}/${ISODateString(
		end
	)}&details=Your reminder is set by Kontests. Contest URL: ${contest.url}`;
	console.log("uri: " + uri);
	browser.tabs.create({ active: true, url: uri });
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
		event.currentTarget.title = "Add Reminder";
		localforage.setItem("AlarmContests", AlarmContests);
		browser.alarms.clear(contest.name);
		console.log("Alarm Cleared");
	} else {
		AlarmContests.push(contest);
		event.currentTarget.style.backgroundColor = "#ffe066";
		event.currentTarget.title = "Remove Reminder";
		var date = getDate(contest.start_time, contest.site === "code_chef");
		console.log(date);
		var now = new Date();

		var time_diff = Math.abs(date.getTime() - now.getTime());
		time_diff = time_diff - 60000;
		localforage.setItem("AlarmContests", AlarmContests);
		browser.alarms.create(contest.name, {
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
		if (contest.in_24_hours === "Yes" && contest.status === "BEFORE")
			in_24_hours.push(contest);
	}
	return in_24_hours;
}
function ongoing(myContests_db) {
	//await getmyContests();
	var Ongoing = [];
	for (var contest of myContests_db) {
		if (contest.status === "CODING") Ongoing.push(contest);
	}
	// console.log(Ongoing);
	// console.log(mycontest);
	return Ongoing;
}
function upcoming(myContests_db) {
	//await getmyContests();

	var Upcoming = [];
	for (var contest of myContests_db) {
		if (contest.status === "BEFORE" && contest.in_24_hours === "No")
			Upcoming.push(contest);
	}

	// console.log(Upcoming);
	// console.log(mycontest);
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
	let c = "";
	for (let i = 0; i < AlarmContests.length; i++) {
		if (AlarmContests[i].name === contest.name) {
			c = "#ffe066";
		}
	}
	return c;
};

function getImage(site) {
	var uri = "";
	switch (site) {
		case "code_chef":
			uri =
				"https://i.pinimg.com/originals/c5/d9/fc/c5d9fc1e18bcf039f464c2ab6cfb3eb6.jpg";
			break;
		case "codeforces":
			uri =
				"https://i.pinimg.com/736x/b4/6e/54/b46e546a3ee4d410f961e81d4a8cae0f.jpg";
			break;
		case "leet_code":
			uri =
				"https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png";
			break;
		case "at_coder":
			uri = "https://avatars.githubusercontent.com/u/7151918?s=200&v=4";
			break;
		case "hacker_rank":
			uri =
				"https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png";
			break;
		case "hacker_earth":
			uri =
				"https://yt3.ggpht.com/ytc/AAUvwngkLcuAWLtda6tQBsFi3tU9rnSSwsrK1Si7eYtx0A=s176-c-k-c0x00ffffff-no-rj";
			break;
		case "kick_start":
			uri =
				"https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip";
			break;
		case "top_coder":
			uri =
				"https://images.ctfassets.net/b5f1djy59z3a/3MB1wM9Xuwca88AswIUwsK/dad472153bcb5f75ea1f3a193f25eee2/Topcoder_Logo_200px.png";
			break;
		default:
		// Do nothing
	}
	return uri;
}
