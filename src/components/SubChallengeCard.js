import * as React from "react";
import {
	Typography,
	CardContent,
	Card,
	Switch,
	FormGroup,
	Stack,
	CardMedia,
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
				backgroundColor: theme.palette.mode === "dark" ? "#FFA20E" : "#009900",
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
			theme.palette.mode === "dark"
				? "rgba(255,255,255,.35)"
				: "rgba(0,0,0,.25)",
		boxSizing: "border-box",
	},
}));

export default function SubChallengeCard({
	dailyChallenge,
	changeDailyChallenge,
}) {
	return (
		<Card
			sx={{
				display: "flex",
				border: 1,
				borderRadius: 2,
				borderColor: "grey.500",
				padding: 1,
				":hover": {
					":hover": {
						borderColor: "#3CC5F3",
						borderWidth: 1.5,
					},
				},
				justifyContent: "center",
			}}
		>
			<CardContent>
				<Typography
					component="div"
					color="text.primary"
					sx={{ fontSize: 16, fontWeight: "bold", marginBottom: "10px" }}
					textAlign="center"
				>
					Daily Challenge
				</Typography>
				<FormGroup>
					<Stack direction="row" spacing={3} alignItems="center">
						<Typography sx={{ fontWeight: "medium" }}>
							<Card>
								<CardMedia
									component="img"
									sx={{
										width: 70,
										height: 70,
										alignSelf: "center",
									}}
									image={dailyChallengePlatformList.leetCode}
								/>
							</Card>
						</Typography>
						<AntSwitch
							checked={dailyChallenge}
							onChange={changeDailyChallenge}
							name="dailyChallengeSwitch"
							inputProps={{ "aria-label": "ant design" }}
						/>
						<Typography sx={{ fontWeight: "medium" }}>
							<Card>
								<CardMedia
									component="img"
									sx={{
										width: 70,
										height: 70,
										alignSelf: "center",
									}}
									image={dailyChallengePlatformList.gfg}
								/>
							</Card>
						</Typography>
					</Stack>
				</FormGroup>
			</CardContent>
		</Card>
	);
}

const dailyChallengePlatformList = {
	leetCode:
		"https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
	gfg: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
};
