import React, { Component } from "react";
import ReactDOM from "react-dom";
import { InputLabel, Input, Button, Icon, SvgIcon, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
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
import IconButton from '@material-ui/core/IconButton';
import codechefIcon from '@iconify-icons/simple-icons/codechef'

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
	const [state, setState] = React.useState({
		codechef: true,
		codeforces: true,
		hackerearth: true,
		hackerrank: true,
		atcoder: true,
		kickstart: true,
		leetcode: true
	});

	const handleChange = (event) => {

		setState({ ...state, [event.target.name]: event.target.checked });
	};

	const {
		codechef,
		codeforces,
		hackerearth,
		hackerrank,
		atcoder,
		kickstart,
		leetcode
	} = state;

	return (
		<div className="form">
			<h2 className="title">SUBSCRIBE</h2>
			{/* <FormControl component="fieldset" className={classes.formControl}> */}
				<div>
					<List className="list-group-item">
						
						<ListItem button >
							<ListItemAvatar>
								<Avatar
									alt={"Codechef"}
									src={`img/CC.png`}
								/>
							</ListItemAvatar>
							<ListItemText primary={`CodeChef`}/>
							<ListItemSecondaryAction>
								<Checkbox name="codechef"
									checked={codechef}
									onChange={handleChange}
								/>
							</ListItemSecondaryAction>
						</ListItem>
						<ListItem button >
							<ListItemAvatar>
								<Avatar
									alt={"CodeForces"}
									src={`img/codechef.png`}
								/>
							</ListItemAvatar>
							<ListItemText primary={`CodeForces`}/>
							<ListItemSecondaryAction>
								<Checkbox name="codeforces"
									checked={codeforces}
									onChange={handleChange}
								/>
							</ListItemSecondaryAction>
						</ListItem>
						<ListItem button >
							<ListItemAvatar>
								<Avatar
									alt={"HackerRank"}
									src={`img/hackerrank.png`}
								/>
							</ListItemAvatar>
							<ListItemText primary={`HackerRank`}/>
							<ListItemSecondaryAction>
								<Checkbox name="hackerrank"
									checked={hackerrank}
									onChange={handleChange}
								/>
							</ListItemSecondaryAction>
						</ListItem>
						<ListItem button >
							<ListItemAvatar>
								<Avatar
									alt={"HackerEarth"}
									src={`img/hackerearth.png`}
								/>
							</ListItemAvatar>
							<ListItemText primary={`HackerEarth`}/>
							<ListItemSecondaryAction>
								<Checkbox name="hackerearth"
									checked={hackerearth}
									onChange={handleChange}
								/>
							</ListItemSecondaryAction>
						</ListItem>
						<ListItem button >
							<ListItemAvatar>
								<Avatar
									alt={"AtCoder"}
									src={`img/topcoder.png`}
								/>
							</ListItemAvatar>
							<ListItemText primary={`AtCoder`}/>
							<ListItemSecondaryAction>
								<Checkbox name="atcoder"
									checked={atcoder}
									onChange={handleChange}
								/>
							</ListItemSecondaryAction>
						</ListItem>
						<ListItem button >
							<ListItemAvatar>
								<Avatar
									alt={"KickStart"}
									src={`img/icon32.png`}
								/>
							</ListItemAvatar>
							<ListItemText primary={`KickStart`}/>
							<ListItemSecondaryAction>
								<Checkbox name="kickstart"
									checked={kickstart}
									onChange={handleChange}
								/>
							</ListItemSecondaryAction>
						</ListItem>
						<ListItem button >
							<ListItemAvatar>
								<Avatar
									alt={"LeetCode"}
									src={`img/leetcode.png`}
								/>
							</ListItemAvatar>
							<ListItemText primary={`Leetcode`}/>
							<ListItemSecondaryAction>
								<Checkbox name="leetcode"
									checked={leetcode}
									onChange={handleChange}
								/>
							</ListItemSecondaryAction>
						</ListItem>
							 
						
					</List>
					{/* <div className="form-group">
            <Button className="btn btn-success">
               Save Changes
            </Button>
        </div> */}
				</div>
			{/* </FormControl> */}
		</div>
	);
}

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Checkbox from '@material-ui/core/Checkbox';
// import Avatar from '@material-ui/core/Avatar';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// export default function Subscribe() {

//   const classes = useStyles();
// 	const [state, setState] = React.useState({
// 		codechef: true,
// 		codeforces: true,
// 		hackerearth: true,
// 		hackerrank: true,
// 		atcoder: true,
// 		kickstart: true,
// 	});

// 	const handleChange = (event) => {
// 		setState({ ...state, [event.target.name]: event.target.checked });
// 	};

// 	const {
// 		codechef,
// 		codeforces,
// 		hackerearth,
// 		hackerrank,
// 		atcoder,
// 		kickstart,
// 	} = state;
// //   const [checked, setChecked] = React.useState([1]);

// //   const handleChange = (value) => () => {
// //     const currentIndex = state.indexOf(value);
// //     const newChecked = [...state];

// //     if (currentIndex === -1) {
// //       newChecked.push(value);
// //     } else {
// //       newChecked.splice(currentIndex, 1);
// //     }

// //     setState(newChecked);
// //   };

//   	return (
    	

//       <div>
// 		<List dense className={classes.root}>  
// 		  <ListItem button>
// 			<ListItemAvatar>
// 				<Avatar
// 					alt={`Codechef`}
// 					src={`img/codechef.jpg`}
// 				/>
// 					</ListItemAvatar>
// 					<ListItemText  primary={`CodeChef`} />
// 					<ListItemSecondaryAction>
// 					<Checkbox
// 						checked={codechef}
// 						onChange={handleChange(codechef)}
// 					/>
// 					</ListItemSecondaryAction>
// 			</ListItem>	
// 			<ListItem button>
// 			<ListItemAvatar>
// 				<Avatar
// 					alt={`CodeForces`}
// 					src={`img/codeforces.jpg`}
// 				/>
// 					</ListItemAvatar>
// 					<ListItemText  primary={`CodeForces`} />
// 					<ListItemSecondaryAction>
// 					<Checkbox
// 						checked={codeforces}
// 						onChange={handleChange}
// 					/>
// 					</ListItemSecondaryAction>
// 			</ListItem>	
// 			<ListItem button>
// 			<ListItemAvatar>
// 				<Avatar
// 					alt={`HackerRank`}
// 					src={`img/hackerrank.png`}
// 				/>
// 					</ListItemAvatar>
// 					<ListItemText  primary={`HackerRank`} />
// 					<ListItemSecondaryAction>
// 					<Checkbox
// 						checked={hackerrank}
// 						onChange={handleChange}
// 					/>
// 					</ListItemSecondaryAction>
// 			</ListItem>
// 			<ListItem button>	
// 			<ListItemAvatar>
// 				<Avatar
// 					alt={`HackerEarth`}
// 					src={`img/hackerearth.png`}
// 				/>
// 					</ListItemAvatar>
// 					<ListItemText  primary={`HackerEarth`} />
// 					<ListItemSecondaryAction>
// 					<Checkbox
// 						checked={hackerearth}
// 						onChange={handleChange}
// 					/>
// 					</ListItemSecondaryAction>
// 			</ListItem>	
// 			<ListItem button>
// 			<ListItemAvatar>
// 				<Avatar
// 					alt={`Atcoder`}
// 					src={`img/icon32.png`}
// 				/>
// 					</ListItemAvatar>
// 					<ListItemText  primary={`AtCoder`} />
// 					<ListItemSecondaryAction>
// 					<Checkbox
// 						checked={atcoder}
// 						onChange={handleChange}
// 					/>
// 					</ListItemSecondaryAction>
// 			</ListItem>	
// 			<ListItem button>
// 			<ListItemAvatar>
// 				<Avatar
// 					alt={`KickStart`}
// 					src={`img/google_play.png`}
// 				/>
// 					</ListItemAvatar>
// 					<ListItemText  primary={`KickStart`} />
// 					<ListItemSecondaryAction>
// 					<Checkbox
// 						checked={kickstart}
// 						onChange={handleChange}
// 					/>
// 					</ListItemSecondaryAction>
// 			</ListItem>	
			
	
	
	

//     	</List>
// 	</div>
// 	)
// }
