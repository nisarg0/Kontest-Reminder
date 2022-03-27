import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

ReactDOM.render(
	<React.StrictMode>
		<MemoryRouter>
			<App />
		</MemoryRouter>
	</React.StrictMode>,
	document.getElementById("root")
);