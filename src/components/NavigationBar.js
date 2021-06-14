import React from "react";
import { Link, withRouter } from "react-router-dom";
function NavigationBar(props) {
	return (
		<div className="navigation">
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<div className="container">
					<Link className="navbar-brand" to="\#" 
						onClick={openSite}
						data-toggle="tooltip"
						data-placement="bottom"
						title="Open Website">
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
								<Link
									className="nav-link"
									to="/"
									data-toggle="tooltip"
									data-placement="bottom"
									title="See Contests"
								>
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
								<Link
									className="nav-link"
									to="/Subscribe"
									data-toggle="tooltip"
									data-placement="bottom"
									title="Subscribe/Unsubscribe Websites"
								>
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

function openSite() {
	var uri = "https://nisarg0.github.io/Kontest-Reminder/";
	chrome.tabs.create({ active: true, url: uri });
}
