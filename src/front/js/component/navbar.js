import React, { useContext, context } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
	const {store, actions} = useContext(Context);
	
	
	
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				
					<Link to="/">
						<span className="navbar-brand mb-0 h1">Authentication</span>
					</Link>
					<div className="ml-auto">
					{	!store.token ?
							<><Link to="/signup">
							<button className="btn btn-primary">Sign up</button>
						</Link>
						<Link to="/login">
								<button className="btn btn-success">Login</button>
							</Link></>
						:
							<Link to="/login">
								<button className="btn btn-primary" 
									onClick={()=>actions.logout()}>Logout</button>
							</Link>
					}
					</div>
			</div>
		</nav>
	);
};
