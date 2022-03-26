import * as React from "react";
import SubscribeCard from "../components/SubscribeCard";
import SubChallenge from "../components/SubChallenge";
import { Grid, Box } from "@mui/material";
import { useContext } from "react";
import { ContestContext } from "../context/contestContext";

export default function Subscribe() {
	const { subscribed, changeSubStatus, changeDailyChallenge } =
		useContext(ContestContext);

	return (
		<Box sx={{ width: "100%", marginTop: "20px", padding: "8px" }}>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<SubChallenge />
				</Grid>

				{Object.keys(subscribed).map(
					(key) =>
						key !== "dailyChallenge" && (
							<Grid item xs={6}>
								<SubscribeCard
									key={key}
									platform={key}
									value={subscribed[key]}
									changeSubStatus={changeSubStatus}
									changeDailyChallenge={changeDailyChallenge}
								/>
							</Grid>
						)
				)}
			</Grid>
		</Box>
	);
}
