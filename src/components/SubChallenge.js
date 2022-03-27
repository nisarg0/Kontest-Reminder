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
			theme.palette.mode === "dark"
				? "rgba(255,255,255,.35)"
				: "rgba(0,0,0,1)",
		boxSizing: "border-box",
	},
}));

export default function ContestCard() {
	return (
		<Card
			sx={{
				display: "flex",
				borderRadius: 2,
				marginBottom: 1.5,
				boxShadow: "none",
				":hover": {
					":hover": {
						boxShadow: "0px 4px 8px rgba(25, 50, 75, 0.12)",
					},
				},
			}}
			onClick={() => {
				browser.tabs.create({ active: true, url: "www.google.in" });
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
					<Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
						<Typography sx={{ fontWeight: "medium", fontSize: '14px' }}>
							Competitive Programming
						</Typography>
						<AntSwitch
							defaultChecked
						/>
						<Typography sx={{ fontWeight: "medium", fontSize: '14px', textAlign: 'right' }}>
							Placement Practice
						</Typography>
					</Box>
				</FormGroup>
			</CardContent>
		</Card>
	);
}
