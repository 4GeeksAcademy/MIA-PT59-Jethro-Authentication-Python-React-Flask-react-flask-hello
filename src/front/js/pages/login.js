import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import {useNavigate} from "react-router";

import "../../styles/login.css";


export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email,setEmail] = useState("");
	const [password, setPassword] = useState("");
	//const token = sessionStorage.getItem("token");
	const history = useNavigate();
	

	console.log("This is your token",store.token);

	const handleClick =() =>{

		actions.login(email,password).then(()=>{
				history("/");
	})
		
		const opts = {
			method :'POST',
			headers:{
				"content-type" : "application/json"
			},
			body   : JSON.stringify({
				"email": email,
				"password" : password
			})
		}

		fetch('https://laughing-doodle-pjr597g9p6xrfv7v-3001.app.github.dev/api/token', opts)
		.then(resp =>{
			if(resp.status === 200) 
				return resp.json();
			else 
				alert("There has been some errors");
		})
		.then(data =>{
			console.log("This comes from backend",data);
			sessionStorage.setItemetItem("token",data.access_token);
		})
		.catch(error =>{
			console.log("There was error !!!", error);
		})
	}


	return (
		<div className="text-center mt-5">
								
			<h1>Login</h1>
			{(store.token && store.token != "" && store.token != undefined) ? "You are logged in with a token"+ store.token :

				<div className="Login">
					<input type="text" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
					<input type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
					<button onClick={handleClick} >Login</button>
				</div>
			}
		</div>
	);
};
