const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token : null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStore : () => {
				const token = sessionStorage.getItem("token");
				console.log("Application just loaded synching the local storage");
				if(token && token != "" && token != undefined) setStore({token:token});
			},

			logout : () => {
				sessionStorage.removeItem("token");
				console.log("Log out");
				setStore({token : null});
			},

			login : async (email,password)=> {

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
			try{
				const resp = await fetch('https://laughing-doodle-pjr597g9p6xrfv7v-3001.app.github.dev/api/token', opts)
					if(resp.status != 200){ 
						alert("There has been some errors");
						return false;
					}
					const data = await resp.json();
						console.log("This comes from backend",data);
						sessionStorage.setItem("token",data.access_token);
						setStore({token : data.access_token})
						return true;
				}
				catch(error){
					console.log("There was error !!!", error);
				}

			},

			getMessage: async () => {
				try{
					const store = getStore();
					const opts = {
						headers :{
							"Authorization" : "Bearer" + store.token
						}//end headers
					}//end const

					// fetching data from the backend
					const resp = await fetch("https://laughing-doodle-pjr597g9p6xrfv7v-3001.app.github.dev/api/hello". opts)
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
