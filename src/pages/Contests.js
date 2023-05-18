import React, { useContext } from "react";
import ContestCard from "../components/ContestCard";
import ChallengeCard from "../components/ChallengeCard";
import CardMedia from "@mui/material/CardMedia";
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
};

const styles = makeStyles({
	root: {},
	tabPanel: {
		backgroundColor: "#F2F2F2",
	},
	tabs: {
		"& .Mui-selected": {
			color: "#222222",
		},
		"& .Mui-selected::after": {
			backgroundColor: "#C4C4C4 !important",
		},
		"& .Mui-selected::before": {
			backgroundColor: "#F2F2F2 !important",
		},
	},
	tabBtn: {
		color: "#222222",
		textTransform: "none !important",
		position: "relative",
		flex: 1,
		outline: "none !important",
		zIndex: 1,

		overflow: "visible !important",
		"&::before": {
			content: "''",
			position: "absolute",
			top: "0",
			left: "0",
			width: "100%",
			height: "100%",
			backgroundColor: "#C4C4C4",
			zIndex: "-2",
		},
		"&::after": {
			content: "''",
			position: "absolute",
			top: "0",
			left: "0",
			width: "100%",
			height: "100%",
			backgroundColor: "#F2F2F2",
			zIndex: "-1",
			borderRadius: "inherit"
		},
	},
});

export default function Contests() {
	const {
		ongoing,
		upcoming,
		today,
		deleteContest,
		dailyChallenge,
		handleAutoOpen,
		isFirstRender,
	} = useContext(ContestContext);
	const classes = styles();
	// console.log("dailyChallenge", dailyChallenge);

	console.log("ongoing", ongoing);
	console.log("upcoming", upcoming);
	console.log("today", today);

	const [value, setValue] = React.useState(1);
	const handleTab = (event, newValue) => {
		setValue(newValue);
	};

	return (
		!isFirstRender && (
			<>
				<Box sx={{ width: "100%" }}>
					<Box>
						<AppBar position="static" sx={{ backgroundColor: "#F2F2F2" }}>
							<Box
								sx={{
									width: "100%",
									height: "8px",
									backgroundColor: "#F2F2F2",
								}}
							></Box>
							<Tabs
								className={classes.tabs}
								// indicatorColor="#F2F2F2"
								TabIndicatorProps={{
									style: { display: "none" },
								}}
								value={value}
								onChange={handleTab}
							>
								<Tab
									sx={{ borderRadius: tabBorders[value].ongoing }}
									className={classes.tabBtn}
									label="Ongoing"
									disableRipple
								/>

								<Tab
									sx={{ borderRadius: tabBorders[value].today }}
									className={classes.tabBtn}
									label="Today"
									disableRipple
								/>

								<Tab
									sx={{ borderRadius: tabBorders[value].upcoming }}
									className={classes.tabBtn}
									label="Upcoming"
									disableRipple
								/>
							</Tabs>
						</AppBar>
					</Box>
					<TabPanel className={classes.tabPanel} value={value} index={0}>
						{ongoing.length === 0 ? (
							<>
								<Box sx={{ textAlign: "center", color: "white" }}>
									No Ongoing Contests
								</Box>
								<CardMedia
									component="img"
									height="400"
									image="https://lh3.googleusercontent.com/pw/AJFCJaVKfrbH93JGd6HdRh07vs6C22DpD2hXJNxLlNTp_Nd0KNS8l7WKrVPghkYgP6UkTq_tyFWkuOGM26JRsBvsihMPmJkbgRBPhZpLHHN3-LTvAg4ztd73pbeZo0cPRQP3zYuRNY3yjyMm-0FbPrysSkewkg=w460-h500-s-no"
								/>
							</>
						) : (
							ongoing.map((contest) => (
								<ContestCard
									key={contest.name}
									contest={contest}
									onDelete={() => deleteContest(contest.name, "ongoing")}
									handleAutoOpen={handleAutoOpen}
								/>
							))
						)}
					</TabPanel>
					<TabPanel className={classes.tabPanel} value={value} index={1}>
						{<ChallengeCard dailyChallenge={dailyChallenge} />}
						{today.length === 0 && !isFirstRender ? (
							<>
								<Box sx={{ textAlign: "center", color: "white" }}>
									No Contest Today
								</Box>
								<CardMedia
									component="img"
									height="400"
									image="https://lh3.googleusercontent.com/pw/AJFCJaVKfrbH93JGd6HdRh07vs6C22DpD2hXJNxLlNTp_Nd0KNS8l7WKrVPghkYgP6UkTq_tyFWkuOGM26JRsBvsihMPmJkbgRBPhZpLHHN3-LTvAg4ztd73pbeZo0cPRQP3zYuRNY3yjyMm-0FbPrysSkewkg=w460-h500-s-no"
								/>
							</>
						) : (
							today.map((contest) => (
								<ContestCard
									key={contest.name}
									contest={contest}
									onDelete={() => deleteContest(contest.name, "today")}
									handleAutoOpen={handleAutoOpen}
								/>
							))
						)}
					</TabPanel>
					<TabPanel className={classes.tabPanel} value={value} index={2}>
						{upcoming.length === 0 ? (
							<>
								<Box sx={{ textAlign: "center", color: "white" }}>
									No Upcoming Contests
								</Box>
								<CardMedia
									component="img"
									height="400"
									image="https://lh3.googleusercontent.com/pw/AJFCJaVKfrbH93JGd6HdRh07vs6C22DpD2hXJNxLlNTp_Nd0KNS8l7WKrVPghkYgP6UkTq_tyFWkuOGM26JRsBvsihMPmJkbgRBPhZpLHHN3-LTvAg4ztd73pbeZo0cPRQP3zYuRNY3yjyMm-0FbPrysSkewkg=w460-h500-s-no"
								/>
							</>
						) : (
							upcoming.map((contest) => (
								<ContestCard
									key={contest.name}
									contest={contest}
									onDelete={() => deleteContest(contest.name, "upcoming")}
									handleAutoOpen={handleAutoOpen}
								/>
							))
						)}
					</TabPanel>
				</Box>
			</>
		)
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
