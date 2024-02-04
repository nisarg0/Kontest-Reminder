import * as React from "react";
import {
	Typography,
	CardMedia,
	Card,
	Tooltip,
	// Button,
} from "@mui/material";

export default function SubscribeCard({
	platform,
	value,
	changeSubStatus,
	checkSubstatus,
}) {
	return (
		<Tooltip
			title={checkSubstatus(platform) ? "Unsubscribe" : "Subscribe"}
			arrow
		>
			<Card
				sx={{
					display: "flex",
					// border: 1,
					// borderRadius: 2,
					// borderColor: "grey.500",
					padding: 1,
					transition: "box-shadow 0.3s ease-in-out",
					":hover": {
						boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
					},
					alignItems: "center",
					width: "100%",
					backgroundColor: value ? "#fff" : "transparent",
					border: "none",
					cursor: "pointer",
				}}
				onClick={() => changeSubStatus(platform)}
				elevation={0}
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
					sx={{ flex: 1, fontSize: 14, textAlign: "center", lineHeight: 1 }}
					fontWeight="550"
				>
					{platform === "GeeksforGeeks" ? "Geeks for Geeks" : platform}
				</Typography>
			</Card>
		</Tooltip>
	);
}

const mapping = {
	hackerearth: {
		logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/HackerEarth_logo.png?20151101082728",
		color: "#323754",
	},
	atcoder: {
		logo: "https://lh3.googleusercontent.com/pw/AJFCJaXOG-3G3GP5qDMwlMMXOYiTvOsMsSKdiaOVKTqjG_G_wClA3L-u5AlcesmmVsy1opp3AiLlkviTopbNzOCHPGEcXVlELZ4KWQSSXpGt73c8yb7mUPucP8gdr5hN1UldqahGk5IkLQUii4dDf1SSFi6GhA=w500-h500-s-no",
		color: "#222222",
	},
	codechef: {
		logo: "https://www.linkpicture.com/q/cc_1.png",
		color: "#D0C3AD",
	},
	leetcode: {
		logo: "https://www.linkpicture.com/q/lc.png",
		color: "#FFA20E",
	},
	geeksforgeeks: {
		logo: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
		color: "#34A853",
	},
	codeforces: {
		logo: "https://www.linkpicture.com/q/cf_1.png",
		color: "#3B5998",
	},
	topcoder: {
		logo: "https://images.ctfassets.net/b5f1djy59z3a/3MB1wM9Xuwca88AswIUwsK/dad472153bcb5f75ea1f3a193f25eee2/Topcoder_Logo_200px.png",
		color: "#F69322",
	},
	hackerrank: {
		logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
		color: "#1BA94C",
	},
};
