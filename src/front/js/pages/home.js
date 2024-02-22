import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";


export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(()=>{
		if(store.token && store.token !="" && store.token !=undefined) 
		   actions.getMessage();
	 }, [store.token]);//end useEffect

	 //store.token in line 25 show the token, in real project I won´t use it.

	return (	

		<div className="text-center mt-5">
								
			<><h1>Hello Rigo!!</h1><p>
				<img src={rigoImageUrl} />
			</p><div className="alert alert-info">
					{store.token} 
				</div><p>
					This boilerplate comes with lots of documentation:{" "}
					<a href="https://start.4geeksacademy.com/starters/react-flask">
						Read documentation
					</a>
				</p></>
		</div>
	);
};

//{store.message || "Loading message from the backend (make sure your python backend is running)..."}
					