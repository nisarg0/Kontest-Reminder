import * as React from "react";
import { Toolbar, Box, AppBar, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function NavigationBar() {
	let location = useLocation().pathname;

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar elevation={0} position="static" sx={{ backgroundColor: "white" }}>
				<Toolbar>
				{/* <Link to="https://nisarg0.github.io/Kontest-Reminder/" style={{ color: "black", textDecoration: "none" }}> */}
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, fontWeight: "650", color: "black" }}
					>
					<Link onClick={openSite} style={{ color: "black", textDecoration: "none" }}>
					Kontest Reminder
					</Link>
						
					
						
					</Typography>
				{/* </Link> */}
					{location === "/" && (
						<Link
							style={{ color: "black", textDecoration: "none" }}
							to="/Subscribe"
						>
							Subscribe
						</Link>
					)}
					{location === "/Subscribe" && (
						<Link style={{ color: "black", textDecoration: "none" }} to="/">
							Home
						</Link>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}

function openSite() {
	var uri = "https://nisarg0.github.io/Kontest-Reminder/";
	chrome.tabs.create({ active: true, url: uri });
}