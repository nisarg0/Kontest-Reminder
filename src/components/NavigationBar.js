import React from "react";
import { Link, withRouter } from "react-router-dom";
import MyContest from "./MyContest";
function NavigationBar(props) {
	return (
		<div className="navigation">
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<div className="container">
					<Link className="navbar-brand" to="/">
						Kontests
					</Link>

					<div>
						<ul className="navbar-nav ml-auto">
							<li
								className={`nav-item  ${
									props.location.pathname === "/"
										? "active"
										: ""
								}`}
							>
								<Link className="nav-link" to="/">
									Home
									<span className="sr-only">(current)</span>
								</Link>
							</li>
							<li
								className={`nav-item  ${
									props.location.pathname === "/Subscribe"
										? "active"
										: ""
								}`}
							>
								<Link className="nav-link" to="/Subscribe">
									Subscribe
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default withRouter(NavigationBar);
