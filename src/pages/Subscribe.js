import * as React from "react";
import SubscribeCard from "../components/SubscribeCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function Subscribe() {
	return (
		<Box sx={{ width: "100%", marginTop: "20px", padding: "8px" }}>
			<Grid container spacing={1}>
				<Grid item xs={6}>
					<SubscribeCard>1</SubscribeCard>
				</Grid>
				<Grid item xs={6}>
					<SubscribeCard>2</SubscribeCard>
				</Grid>
				<Grid item xs={6}>
					<SubscribeCard>3</SubscribeCard>
				</Grid>
				<Grid item xs={6}>
					<SubscribeCard>4</SubscribeCard>
				</Grid>
			</Grid>
		</Box>
	);
}
