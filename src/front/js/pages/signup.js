import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css";


export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [email,setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useNavigate();
	
	const handleClick =() =>{

		actions.login(email,password).then(()=>{
				history("/");
	})
	/*	
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
	*/
}

	return (
		<div className="text-center mt-5">
								
			<h1>Sign up</h1>
			<div className="Signup">
				<b><input type="text" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
				   <input type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
				</b>				
				<button onClick={handleClick}>Signup</button>
			</div>
			
		</div>
	);
};
