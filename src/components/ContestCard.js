import * as React from "react";
import {
	Typography,
	CardMedia,
	CardContent,
	Card,
	Box,
	Button,
} from "@mui/material";
import delIcon from "../assets/delete.png";
import calIcon from "../assets/Calander.png";
import openIcon from "../assets/auto-open.png";

// For browser apis
var browser = require("webextension-polyfill");

export default function ContestCard({ contest, onDelete }) {
	const calanderIcon = <img alt="calander" src={calIcon} />;
	const autoopenIcon = <img alt="auto-open" src={openIcon} />;
	const BinIcon = () => <img alt="bin" src={delIcon} />;
	const color = mapping[contest.site].color;

	const handleCalanderClick = (event) => {
		event.stopPropagation();
		console.log("start_time: ", contest.start_time);
	};

	return (
		<Box
			sx={{
				position: "relative",
				overflow: "visible",
				":hover .bin": {
					display: "block",
				},
			}}
		>
			<Card
				sx={{
					display: "flex",
					borderRadius: 2,
					marginBottom: 1.5,
					marginRight: 1.5,
					marginLeft: 1.5,
					p: 2,
					boxShadow: "none",
					":hover": {
						":hover": {
							boxShadow: "0px 4px 8px rgba(25, 50, 75, 0.10)",
						},
					},
				}}
				onClick={() => {
					browser.tabs.create({ active: true, url: contest.url });
				}}
			>
				<CardMedia
					component="img"
					sx={{
						width: 70,
						height: 70,
						borderRadius: 2,
						alignSelf: "center",
					}}
					image={mapping[contest.site].logo}
					alt={contest.name}
				/>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						padding: 0,
						width: "100%",
					}}
				>
					<CardContent sx={{ flex: "1 0 auto", padding: 0 }}>
						<Typography
							className="contest-name"
							component="div"
							color="text.primary"
							sx={{ fontSize: 14 }}
							textAlign="center"
							fontWeight="600"
						>
							{contest.name}
						</Typography>
						<Box
							sx={{ display: "flex", padding: "10px" }}
							justifyContent="space-evenly"
						>
							<Box sx={{ marginLeft: "8px" }}>
								<Typography
									variant="caption"
									color="#919191"
									component="div"
									sx={{ fontSize: "9px", fontWeight: "600" }}
								>
									{"Start: " + beautifyDate(contest.start_time)}
								</Typography>
								<Typography
									variant="caption"
									color="#919191"
									component="div"
									sx={{ fontSize: "9px", fontWeight: "600" }}
								>
									{"End:  " + beautifyDate(contest.end_time)}
								</Typography>
							</Box>
							<Box
								sx={{
									width: "30px",
									height: "30px",
									borderRadius: "50%",
									backgroundColor: color,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "0.55rem",
									fontWeight: "800",
									color: "white",
								}}
							>
								{findContestLength(contest.start_time, contest.end_time)}
							</Box>
						</Box>
					</CardContent>

					<Box display="flex" justifyContent="space-evenly">
						<Button
							variant="contained"
							size="small"
							sx={{
								fontSize: 9,
								textTransform: "none",
								backgroundColor: "#67D6FA",
								boxShadow: "none",
								":hover": {
									bgcolor: color,
								},
							}}
							startIcon={calanderIcon}
							onClick={handleCalanderClick}
						>
							Add to Calendar
						</Button>

						<Button
							variant="contained"
							size="small"
							sx={{
								fontSize: 9,
								textTransform: "none",
								backgroundColor: "#67D6FA",
								boxShadow: "none",
								":hover": {
									bgcolor: color,
								},
							}}
							startIcon={autoopenIcon}
						>
							Auto open
						</Button>
					</Box>
				</Box>
			</Card>
			<Box
				sx={{
					position: "absolute",
					top: "-10px",
					right: "0px",
					display: "None",
				}}
				className="bin"
			>
				<Button
					sx={{
						borderRadius: "50%",
						width: "28px",
						height: "28px",
						margin: 0,
						padding: 0,
						minWidth: "28px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "#FFFFFF",
						boxShadow: "0px 5px 12px rgba(0, 0, 0, 0.25)",
						":hover": {
							backgroundColor: "#F5F5F5",
							borderColor: "#F5F5F5",
						},
					}}
					variant="contained"
					onClick={onDelete}
				>
					<BinIcon />
				</Button>
			</Box>
		</Box>
	);
}

// ************************************************* Helper Functions **************************************************

const mapping = {
	HackerEarth: {
		logo: "https://yt3.ggpht.com/ytc/AAUvwngkLcuAWLtda6tQBsFi3tU9rnSSwsrK1Si7eYtx0A=s176-c-k-c0x00ffffff-no-rj",
		color: "#323754",
	},
	AtCoder: {
		logo: "https://avatars.githubusercontent.com/u/7151918?s=200&v=4",
		color: "#222222",
	},
	CodeChef: {
		logo: "https://i.pinimg.com/originals/c5/d9/fc/c5d9fc1e18bcf039f464c2ab6cfb3eb6.jpg",
		color: "#D0C3AD",
	},
	LeetCode: {
		logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
		color: "#FFA20E",
	},
	"Kick Start": {
		logo: "https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip",
		color: "#34A853",
	},
	CodeForces: {
		logo: "https://i.pinimg.com/736x/b4/6e/54/b46e546a3ee4d410f961e81d4a8cae0f.jpg",
		color: "#3B5998",
	},
	TopCoder: {
		logo: "https://images.ctfassets.net/b5f1djy59z3a/3MB1wM9Xuwca88AswIUwsK/dad472153bcb5f75ea1f3a193f25eee2/Topcoder_Logo_200px.png",
		color: "#F69322",
	},
	HackerRank: {
		logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
		color: "#1BA94C",
	},
};

const beautifyDate = (date) => {
	let date_options = {
		day: "2-digit",
		month: "short",
		year: "numeric",

		hour: "numeric",
		minute: "numeric",
	};
	return new Date(date)
		.toLocaleString("en-IN", date_options)
		.replaceAll("-", " ");
};

const findContestLength = (start, end) => {
	let start_date = new Date(start);
	let end_date = new Date(end);
	let diff = end_date.getTime() - start_date.getTime();
	let diff_in_days = diff / (1000 * 3600 * 24);
	if (diff_in_days < 1) {
		return `${Math.floor(diff / (1000 * 3600))}Hr`;
	}
	if (diff_in_days < 7) {
		return `${Math.floor(diff_in_days)}D`;
	}
	if (diff_in_days < 30) {
		return `${Math.floor(diff_in_days / 7)}W`;
	}
	if (diff_in_days < 365) {
		return `${Math.floor(diff_in_days / 30)}M`;
	}
	return `${Math.floor(diff_in_days / 365)}Y`;
};
