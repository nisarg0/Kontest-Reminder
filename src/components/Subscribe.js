import React, { useState, useEffect } from "react";
import {
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import "./Subscribe.css";
import localforage from "localforage";

export default function Subscribe() {
	const [showWarning, setShowWarning] = useState(false);
	const [platforms, setplatforms] = React.useState([]);
	useEffect(() => {
		async function getPlatforms() {
			console.log("1. In getPlatforms");
			await localforage.getItem("platforms", function (err, value) {
				if (value === null) {
					console.log("Err: No platforms array in DB");
					return;
				}
				setplatforms([...value]);
			});
		}
		getPlatforms();
	}, []);

	const handleChange = (event, index) => {
		let newPlatforms = [...platforms];
		newPlatforms[index] = {
			...platforms[index],
			isSubscribed: !platforms[index].isSubscribed,
		};
		setShowWarning(true);
		setTimeout(() => setShowWarning(false), 3000);
		setplatforms(newPlatforms);
		localforage.setItem("platforms", newPlatforms);
		console.log(newPlatforms);

		chrome.runtime.sendMessage({ data: "Update MyContests" });
	};

	return (
		<div className="form">
			{/* <h2 className="title">SUBSCRIBE</h2> */}
			{showWarning && (
				<h2
					style={{
						padding: "16px",
						fontSize: "12px",
						backgroundColor: "#ffe066",
						width: "100%",
						textAlign: "center",
					}}
				>
					This may take upto 5 sec to come into effect
				</h2>
			)}
			<div>
				<List className="list-group-item">
					{platforms.map((platform, index) => (
						<ListItem button key={index}>
							<ListItemAvatar>
								<Avatar variant="square" src={getImage(platform.platform)} />
							</ListItemAvatar>
							<ListItemText
								primary={getSiteName(platform.platform)}
							/>
							<ListItemSecondaryAction>
								<Checkbox
									checked={platform.isSubscribed}
									onChange={(e) => handleChange(e, index)}
								/>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</List>
			</div>
		</div>
	);
}

// ======================================= Helper =====================================

function getImage(site) {
	var uri = "";
	switch (site) {
		case "code_chef":
			uri =
				"https://i.pinimg.com/originals/c5/d9/fc/c5d9fc1e18bcf039f464c2ab6cfb3eb6.jpg";
			break;
		case "codeforces":
			uri =
				"https://i.pinimg.com/736x/b4/6e/54/b46e546a3ee4d410f961e81d4a8cae0f.jpg";
			break;
		case "leet_code":
			uri =
				"https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png";
			break;
		case "at_coder":
			uri = "https://avatars.githubusercontent.com/u/7151918?s=200&v=4";
			break;
		case "hacker_rank":
			uri =
				"https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png";
			break;
		case "hacker_earth":
			uri =
				"https://yt3.ggpht.com/ytc/AAUvwngkLcuAWLtda6tQBsFi3tU9rnSSwsrK1Si7eYtx0A=s176-c-k-c0x00ffffff-no-rj";
			break;
		case "kick_start":
			uri =
				"https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip";
			break;
		case "top_coder":
			uri =
				"https://images.ctfassets.net/b5f1djy59z3a/3MB1wM9Xuwca88AswIUwsK/dad472153bcb5f75ea1f3a193f25eee2/Topcoder_Logo_200px.png";
			break;
		default:
		// Do nothing
	}
	return uri;
}

function getSiteName(site) {
	var name = "";
	switch (site) {
		case "code_chef":
			name = "Code Chef";
			break;
		case "codeforces":
			name = "Codeforces";
			break;
		case "leet_code":
			name = "Leet Code";
			break;
		case "at_coder":
			name = "At Coder";
			break;
		case "hacker_rank":
			name = "Hacker Rank";
			break;
		case "hacker_earth":
			name = "Hacker Earth";
			break;
		case "kick_start":
			name = "Kick Start";
			break;
		case "top_coder":
			name = "Top Coder";
			break;
		default:
		// Do nothing
	}
	return name;
}
