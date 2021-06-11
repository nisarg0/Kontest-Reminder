import "./App.css";
import Subscribe from "./components/Subscribe";
import NavigationBar from "./components/NavigationBar";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import MyContest from "./components/MyContest";

function App() {
	return (
		<div>
			<Router>
				<NavigationBar />
				<Switch>
					<Route path="/" exact component={MyContest} />
					<Route path="/Subscribe" component={Subscribe} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
