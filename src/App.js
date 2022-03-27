import "./App.css";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import NavigationBar from "./components/NavigationBar";
import { Switch, Route } from "react-router-dom";
// import MyContest from "./components/MyContest";

import Contests from "./pages/Contests";
import Subscribe from "./pages/Subscribe";
import ContestProvider from "./context/contestContext";

function App() {
	const theme = createTheme({
		typography: {
			fontFamily: ["Montserrat", "sans-serif"].join(","),
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<ContestProvider>
				<NavigationBar />
				<Switch>
					<Route path="/" exact component={Contests} />
					<Route path="/Subscribe" component={Subscribe} />
				</Switch>
				{/* <Subscribe /> */}
			</ContestProvider>
		</ThemeProvider>
	);
}

export default App;
