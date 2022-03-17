import React, { useContext } from "react";
import ContestCard from "../components/ContestCard";
// import ContestConsumer from "../context/contestContext";
import { ContestContext } from "../context/contestContext";
import { Tabs, Tab, AppBar } from "@mui/material";
import Box from "@mui/material/Box";

// const colorMapping =  {
// 	"Round A": "Round A",
// 	"Hacker Rank" :{
// 		color
// 	},
// }
// const imgMapping = {
// 	"Hacer Rank": "",
// }

export default function Contests() {
	const { ongoing, upcoming, today, deleteContest } =
		useContext(ContestContext);
	console.log("ongoing", ongoing);
	console.log("upcoming", upcoming);
	console.log("today", today);
	const [value, setValue] = React.useState(1);
	const handleTab = (event, newValue) => {
		console.warn(newValue);
		setValue(newValue);
	};

	return (
		<>
			<Box sx={{ width: "100%" }}>
				<Box>
					<AppBar position="static" color="default">
						<Tabs value={value} onChange={handleTab}>
							<Tab label="Ongoing" />
							<Tab label="Today" />
							<Tab label="Upcoming" />
						</Tabs>
					</AppBar>
				</Box>
				<TabPanel value={value} index={0}>
					{ongoing.length === 0 ? (
						<Box sx={{ textAlign: "center" }}> No Ongoing Contests </Box>
					) : (
						ongoing.map((contest) => (
							<ContestCard
								key={contest.name}
								contest={contest}
								onDelete={() => deleteContest(contest.name, "ongoing")}
							/>
						))
					)}
				</TabPanel>
				<TabPanel value={value} index={1}>
					{today.length === 0 ? (
						<Box sx={{ textAlign: "center" }}> No Today's Contests </Box>
					) : (
						today.map((contest) => (
							<ContestCard
								key={contest.name}
								contest={contest}
								onDelete={() => deleteContest(contest.name, "today")}
							/>
						))
					)}
				</TabPanel>
				<TabPanel value={value} index={2}>
					{upcoming.length === 0 ? (
						<Box sx={{ textAlign: "center" }}> No Upcoming Contests </Box>
					) : (
						upcoming.map((contest) => (
							<ContestCard
								key={contest.name}
								contest={contest}
								onDelete={() => deleteContest(contest.name, "upcoming")}
							/>
						))
					)}
				</TabPanel>
			</Box>
		</>
	);
}

function TabPanel(props) {
	const { children, value, index } = props;
	if (value === index) {
		return (
			<div>
				<h1>{children}</h1>
			</div>
		);
	} else return null;
}
