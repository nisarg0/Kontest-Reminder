import * as React from "react";
import { Toolbar, Box, AppBar, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function NavigationBar() {
	let location = useLocation().pathname;

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ backgroundColor: "#4D4847" }}>
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, fontWeight: "650" }}
					>
						Kontest Reminder
					</Typography>
					{location === "/" && (
						<Link
							style={{ color: "white", textDecoration: "none" }}
							to="/Subscribe"
						>
							Subscribe
						</Link>
					)}
					{location === "/Subscribe" && (
						<Link style={{ color: "white", textDecoration: "none" }} to="/">
							Home
						</Link>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
