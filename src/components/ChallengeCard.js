import * as React from "react";
import { Typography, CardMedia, CardContent, Card, Box } from "@mui/material";

// For browser apis
var browser = require("webextension-polyfill");

export default function ContestCard(dailyChallenge) {
	dailyChallenge = dailyChallenge.dailyChallenge;
	return (
		<Box
			sx={{
				position: "relative",
				overflow: "visible",
				":hover .bin": {
					display: "block",
				},
				cursor: "default",
			}}
		>
			<Card
				sx={{
					display: "flex",
					border: 1,
					borderRadius: 2,
					borderColor: "grey.500",
					marginBottom: 1.5,
					marginRight: 1.5,
					marginLeft: 1.5,
					padding: 1,
					":hover": {
						":hover": {
							borderColor: "#3CC5F3",
							borderWidth: 1.5,
						},
					},
				}}
				onClick={() => {
					browser.tabs.create({ active: true, url: dailyChallenge.link });
				}}
			>
				<CardMedia
					component="img"
					sx={{
						width: 70,
						height: 70,
						borderRadius: 2,
						alignSelf: "center",
						marginLeft: 1,
					}}
					image={profilePic[dailyChallenge.platform]}
					alt={dailyChallenge.platform}
				/>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						padding: "8px",
						width: "100%",
					}}
				>
					<CardContent sx={{ flex: "1 0 auto", padding: 0 }}>
						<Typography
							component="div"
							color="text.primary"
							sx={{ fontSize: 15 }}
							textAlign="center"
							fontWeight="600"
							paddingBottom="8px"
						>
							Daily Challenge
						</Typography>
						<Typography
							component="div"
							color="text.primary"
							sx={{ fontSize: 12, fontWeight: "bold" }}
							textAlign="center"
							justifyContent="center"
							fontWeight="525"
						>
							{dailyChallenge.title}
						</Typography>

						<Typography
							variant="caption"
							color="text.secondary"
							component="div"
							sx={{
								fontSize: "0.55rem",
								fontWeight: "600",
								position: "absolute",
								bottom: 8,
								right: 22,
							}}
						>
							{dailyChallenge.difficulty}
						</Typography>
					</CardContent>
				</Box>
			</Card>
		</Box>
	);
}

const profilePic = {
	geeksforgeeks:
		"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
	leetcode:
		"https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
};
