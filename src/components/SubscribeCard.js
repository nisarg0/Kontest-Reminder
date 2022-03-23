import * as React from "react";
import {
	Typography,
	CardMedia,
	Card,
	// Button,
} from "@mui/material";

export default function SubscribeCard() {
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
			}}
		>
			<CardMedia
				component="img"
				sx={{
					width: 35,
					height: 35,
					borderRadius: 2,
					alignSelf: "center",
				}}
				image={"https://avatars.githubusercontent.com/u/7151918?s=200&v=4"}
			/>

			<Typography
				component="div"
				color="text.primary"
				sx={{ flex: 1, fontSize: 14, textAlign: "center" }}
				fontWeight="550"
			>
				Atcoder
			</Typography>
		</Card>
	);
}
