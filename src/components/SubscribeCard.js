import * as React from "react";
import {
	Typography,
	CardMedia,
	Card,
	// Button,
} from "@mui/material";

export default function SubscribeCard({ platform, value, changeSubStatus }) {
	console.log(platform);
	console.log(value);
	return (
		<Card
			sx={{
				display: "flex",
				border: 1,
				borderRadius: 2,
				borderColor: "grey.500",
				padding: 1,
				":hover": {
					"box-shadow": "0px 0px 10px 3px rgba(0, 0, 0, 0.2)",
				},
				alignItems: "center",
				width: "100%",
				backgroundColor: value ? "#b3e0ff" : "white",
			}}
			onClick={() => changeSubStatus(platform)}
		>
			<CardMedia
				component="img"
				sx={{
					width: 35,
					height: 35,
					borderRadius: 2,
					alignSelf: "center",
				}}
				image={mapping[platform].logo}
			/>

			<Typography
				component="div"
				color="text.primary"
				sx={{ flex: 1, fontSize: 14, textAlign: "center", cursor: "default" }}
				fontWeight="550"
			>
				{platform}
			</Typography>
		</Card>
	);
}

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
