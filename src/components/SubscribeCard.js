import * as React from "react";
import {
	Typography,
	CardMedia,
	Card,
	// Button,
} from "@mui/material";

export default function SubscribeCard({ platform, value, changeSubStatus }) {
	return (
		<Card
			sx={{
				display: "flex",
				// border: 1,
				// borderRadius: 2,
				// borderColor: "grey.500",
				padding: 1,
				":hover": {
					"box-shadow": "0px 0px 10px 3px rgba(0, 0, 0, 0.2)",
				},
				alignItems: "center",
				width: "100%",
				backgroundColor: value ? "#fff" : "transparent",
				border: "none",
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
		logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/HackerEarth_logo.png?20151101082728",
		color: "#323754",
	},
	AtCoder: {
		logo: "https://lh3.googleusercontent.com/pw/AJFCJaXOG-3G3GP5qDMwlMMXOYiTvOsMsSKdiaOVKTqjG_G_wClA3L-u5AlcesmmVsy1opp3AiLlkviTopbNzOCHPGEcXVlELZ4KWQSSXpGt73c8yb7mUPucP8gdr5hN1UldqahGk5IkLQUii4dDf1SSFi6GhA=w500-h500-s-no",
		color: "#222222",
	},
	CodeChef: {
		logo: "https://lh3.googleusercontent.com/pw/AJFCJaUa3As4Jm9xDu2CvqrC8QiN9v0Qo1dHmLX9OFga1dDJQ-gtFRl1xfWhAPrpbpwLPgTgEw1Z98GL-7X1-WYEhkLjRDZQKkZlfLSVwdNmfOZuke-moFmD8o5kocU133Y8W5QvgtrS4gP2edJ3ccpyZgvXnw=w500-h500-s-no?authuser=0",
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
		logo: "https://lh3.googleusercontent.com/pw/AJFCJaUvRqnkk8vFL-3-PmNz2atfFLpAdi6ttG561IMiSLa-QllTQL8_WXPbYsb6WVJNBYIe8M-bct7CnGxiPD77D68zLMsf8E1c_4XuHVqos2pNIYVAAuR9ulR5nh97OGEmpppEaP8JAXXyzFmtyq9ybXrbWA=w512-h512-s-no",
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
