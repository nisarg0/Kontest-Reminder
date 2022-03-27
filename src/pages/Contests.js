import React, { useContext } from "react";
import ContestCard from "../components/ContestCard";
import ChallengeCard from "../components/ChallengeCard";
// import ContestConsumer from "../context/contestContext";
import { ContestContext } from "../context/contestContext";
import { Tabs, Tab, AppBar } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
	root: {},
	tabPanel: {
		backgroundColor: "#F2F2F2",
	},
	tabs: {
		"& .Mui-selected": {
			backgroundColor: "#C4C4C4 !important",
		},
		backgroundColor: "#C4C4C4",
	},
	tabBtn: {
		textTransform: "none !important",
		position: "relative",
		flex: 1,
		outline: "none !important",
		borderRadius: "12px !important",
		// backgroundColor: "#F2F2F2 !important",
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
					<AppBar position="static" sx={{ backgroundColor: "#F2F2F2" }}>
						<Box
							sx={{ width: "100%", height: "8px", backgroundColor: "#F2F2F2" }}
						></Box>
						<Tabs
							className={classes.tabs}
							value={value}
							onChange={handleTab}
						>
							<Tab className={classes.tabBtn} label="Ongoing" />

							<Tab className={classes.tabBtn} label="Today" />

							<Tab className={classes.tabBtn} label="Upcoming" />
						</Tabs>
					</AppBar>
				</Box>
				<TabPanel className={classes.tabPanel} value={value} index={0}>
					{ongoing.length === 0 ? (
						<Box sx={{ textAlign: "center", color: "white" }}>
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
						<Box sx={{ textAlign: "center", color: "white" }}>
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
						<Box sx={{ textAlign: "center", color: "white" }}>
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
			<Box sx={{ paddingTop: 1.5, backgroundColor: "#C4C4C4" }}>{children}</Box>
		);
	} else return null;
}
