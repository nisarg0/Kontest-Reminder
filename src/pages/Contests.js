import React, { useContext } from "react";
import ContestCard from "../components/ContestCard";
import ChallengeCard from "../components/ChallengeCard";
// import ContestConsumer from "../context/contestContext";
import { ContestContext } from "../context/contestContext";
import { Tabs, Tab, AppBar } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

const tabBorders = {
	0: {
		ongoing: "12px 12px 0px 0px !important",
		today: "0px 0px 0px 12px !important",
		upcoming: "0px 0px 0px 0px !important",
	},
	1: {
		ongoing: "0px 0px 12px 0px !important",
		today: "12px 12px 0px 0px !important",
		upcoming: "0px 0px 0px 12px !important",
	},
	2: {
		ongoing: "0px 0px 0px 0px !important",
		today: "0px 0px 12px 0px !important",
		upcoming: "12px 12px 0px 0px !important",
	},
}

const styles = makeStyles({
	root: {},
	tabPanel: {
		backgroundColor: "#E5E5E5",
	},
	tabs: {
		"& .Mui-selected": { 
			color: "#222222"
		},
		"& .Mui-selected .MuiTouchRipple-root": {
			backgroundColor: "#F5F5F5 !important",
		},
		"& .Mui-selected::before": {
			backgroundColor: "#E5E5E5 !important"
		}
	},
	tabBtn: {
		color: '#222222',
		textTransform: "none !important",
		position: "relative",
		flex: 1,
		outline: "none !important",
		zIndex: 1,

		"& .MuiTouchRipple-root": {
			zIndex: "-1",
			backgroundColor: '#E5E5E5',
		},

		overflow: "visible !important",
		"&::before": {
			content: "''",
			position: "absolute",
			top: "0",
			left: "0",
			width: "100%",
			height: "100%",
			backgroundColor: "#F5F5F5",
			zIndex: "-1"
		}
	},
});

export default function Contests() {
	const { ongoing, upcoming, today, deleteContest } =
		useContext(ContestContext);
	const classes = styles();

	const [value, setValue] = React.useState(1);
	const handleTab = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<Box sx={{ width: "100%" }}>
				<Box>
					<AppBar position="static" sx={{ backgroundColor: "#E5E5E5" }}>
						<Box
							sx={{ width: "100%", height: "8px", backgroundColor: "#E5E5E5" }}
						></Box>
						<Tabs
							className={classes.tabs}
							value={value}
							onChange={handleTab}
						>
							<Tab sx={{ borderRadius: tabBorders[value].ongoing}} className={classes.tabBtn} label="Ongoing" />

							<Tab sx={{ borderRadius: tabBorders[value].today}} className={classes.tabBtn} label="Today" />

							<Tab sx={{ borderRadius: tabBorders[value].upcoming}} className={classes.tabBtn} label="Upcoming" />
						</Tabs>
					</AppBar>
				</Box>
				<TabPanel className={classes.tabPanel} value={value} index={0}>
					{ongoing.length === 0 ? (
						<Box sx={{ textAlign: "center", color: "#333" }}>
							No Ongoing Contests
						</Box>
					) : (
						ongoing.map((contest) => (
							<ContestCard
								key={contest.name}
								contest={contest}
								onDelete={() => deleteContest(contest.name)}
							/>
						))
					)}
				</TabPanel>
				<TabPanel className={classes.tabPanel} value={value} index={1}>
					{<ChallengeCard />}
					{today.length === 0 ? (
						<Box sx={{ textAlign: "center", color: "#333" }}>
							No Contest Today
						</Box>
					) : (
						today.map((contest) => (
							<ContestCard
								key={contest.name}
								contest={contest}
								onDelete={() => deleteContest(contest.name)}
							/>
						))
					)}
				</TabPanel>
				<TabPanel className={classes.tabPanel} value={value} index={2}>
					{upcoming.length === 0 ? (
						<Box sx={{ textAlign: "center", color: "#333" }}>
							No Upcoming Contests
						</Box>
					) : (
						upcoming.map((contest) => (
							<ContestCard
								key={contest.name}
								contest={contest}
								onDelete={() => deleteContest(contest.name)}
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
			<Box sx={{ paddingTop: 1.5, backgroundColor: "#F5F5F5" }}>{children}</Box>
		);
	} else return null;
}
