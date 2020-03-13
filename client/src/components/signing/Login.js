import React from "react"   
import axios from "axios"
import {Link} from "react-router-dom"
import "./signing.css"

class Login extends React.Component {
	constructor(props) {
			super(props);
			this.state = {
					email: "",
					password: ""
			}
	}
	
	handleChange = (event) => {
			let { name, value } = event.target;
			this.setState({
					[name]: value
			});
	}

	handleSubmit = (event) => {
			event.preventDefault();
			axios("/api/users/login", {
					method: "POST",
					headers: {
							"Content-Type": "application/json"
					},
					data: {email: this.state.email, password: this.state.password}
			}).then(res => {
					console.log("yello ",res)
					// this.props.setUser(res.data.profile);
					localStorage.setItem("token", res.data.token);
					// console.log({localStorage})
					// this.props.history.push(`/`)
			}).then(res =>
					console.log(res)
			)	
	}

	render() {
		return(
			<>
			<div className="card-body d-flex flex-column justify-content-center">
				<h1 className="card-title text-center heading">Sign In</h1>
				<Link className="card-text text-center link pb-3" to ="/register">Create an account ?</Link>
				<form className="d-flex flex-column mx-auto signup-form" onSubmit={this.handleSubmit}>
					<div className="form-group">
						<input onChange={this.handleChange}  className="h-100 form-control p-3 mb-3 signup-input" name="email" type="text" placeholder="Email"/>
					</div>
					<div className="form-group">
						<input onChange={this.handleChange} className="h-100 form-control p-3 mb-3 signup-input" name="password" type="password" placeholder="Password"/>
					</div>
					<div className="button d-flex justify-content-end">
						<button type="submit"className="btn w-20 btn-lg btn-success">Login</button>
					</div>
				</form>
			</div>
			
			</>   
		)
	}

}

export default Login