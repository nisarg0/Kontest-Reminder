import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
	InputLabel,
	Input,
	Button,
	Icon,
	SvgIcon,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { blueGrey } from "@material-ui/core/colors";
import "./Subscribe.css";
import localforage from "localforage";
import IconButton from "@material-ui/core/IconButton";
import at_coder from "./img/at_coder.png";
import code_chef from "./img/code_chef.png";
import codeforces from "./img/codeforces.png";
import hacker_earth from "./img/hacker_earth.png";
import hacker_rank from "./img/hacker_rank.png";
import kick_start from "./img/kick_start.png";
import leet_code from "./img/leet_code.png";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	formControl: {
		margin: theme.spacing(3),
	},
}));

export default function Subscribe() {
	const classes = useStyles();
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
		setplatforms(newPlatforms);
		localforage.setItem("platforms", newPlatforms);
		console.log(newPlatforms);
	};

	return (
		<div className="form">
			<h2 className="title">SUBSCRIBE</h2>
			<div>
				<List className="list-group-item">
					{platforms.map((platform, index) => (
						<ListItem button key={index}>
							<ListItemAvatar>
								<Avatar
									alt={"Codechef"}
									src={platform.platform}
								/>
							</ListItemAvatar>
							<ListItemText primary={platform.platform} />
							<ListItemSecondaryAction>
								<Checkbox
									name="code_chef"
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
