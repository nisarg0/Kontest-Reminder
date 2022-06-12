import * as React from "react";
import {
	Typography,
	CardContent,
	Card,
	Switch,
	FormGroup,
	Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const AntSwitch = styled(Switch)(({ theme }) => ({
	width: 28,
	height: 16,
	padding: 0,
	display: "flex",
	"&:active": {
		"& .MuiSwitch-thumb": {
			width: 15,
		},
		"& .MuiSwitch-switchBase.Mui-checked": {
			transform: "translateX(9px)",
		},
	},
	"& .MuiSwitch-switchBase": {
		padding: 2,
		"&.Mui-checked": {
			transform: "translateX(12px)",
			color: "#fff",
			"& + .MuiSwitch-track": {
				opacity: 1,
				backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
			},
		},
	},
	"& .MuiSwitch-thumb": {
		boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
		width: 12,
		height: 12,
		borderRadius: 6,
		transition: theme.transitions.create(["width"], {
			duration: 200,
		}),
	},
	"& .MuiSwitch-track": {
		borderRadius: 16 / 2,
		opacity: 1,
		backgroundColor:
			theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : "rgba(0,0,0,1)",
		boxSizing: "border-box",
	},
}));

export default function SubChallengeCard(input) {
	console.log("Input", input);
	console.log("Here1");
	var Challenge = input.Challenge;
	var changeDailyChallenge = input.changeDailyChallenge;
	return (
		<Card
			sx={{
				display: "flex",
				borderRadius: 2,
				borderLeft: Challenge !== 0 ? "5px solid #1FA0DB" : "5px solid black",
				padding: 1,
				":hover": {
					"box-shadow": "0px 0px 8px 3px rgba(50, 100, 150, 0.16)",
				},
			}}
			onClick={() => {
				Challenge === 1 ? changeDailyChallenge(2) : changeDailyChallenge(1);
			}}
		>
			<CardContent>
				<Typography
					component="div"
					color="text.primary"
					sx={{ fontSize: 16, fontWeight: "bold", marginBottom: "8px" }}
					textAlign="center"
				>
					Daily Challenge
				</Typography>
				<FormGroup>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography sx={{ fontWeight: "medium" }}>
							Competitive Programming
						</Typography>
						<AntSwitch defaultChecked variant="contained" />
						<Typography sx={{ fontWeight: "medium", textAlign: "right" }}>
							Placement Practice
						</Typography>
					</Box>
				</FormGroup>
			</CardContent>
		</Card>
	);
}
