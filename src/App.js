import "./App.css";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

// import Subscribe from "./components/Subscribe";
// import NavigationBar from "./components/NavigationBar";
// import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
// import MyContest from "./components/MyContest";

import Contests from "./pages/Contests";
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
				<Contests />
			</ContestProvider>
		</ThemeProvider>
	);
}

export default App;
