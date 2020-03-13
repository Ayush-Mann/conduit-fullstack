import React from "react"   
import axios from "axios"
import {Link} from "react-router-dom"
import "./signing.css"


class Signup extends React.Component {
	constructor(props) {
			super(props);
			this.state = {
					email: null,
					password: null,
					username: null
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
			axios("/api/users", {
					method: "POST",
					headers: {
							"Content-Type": "application/json"
					},
					data: {email: this.state.email, password: this.state.password, username:this.state.username}
			}).then(res => console.log("axios working"))
	}

	render() {
			return(
					<>
						<div className="card-body d-flex  flex-column justify-content-center">
							<h1 className="card-title text-center heading">Sign Up</h1>
							<Link className="card-text text-center link pb-3" to ="/login">Have an account ?</Link>
							<form className="d-flex flex-column mx-auto signup-form" onSubmit={this.handleSubmit}>
								<div className="form-group">
										<input onChange={this.handleChange} className="h-100 form-control p-3 mb-3 signup-input" name="username" type="text" placeholder="Username"/>
								</div>
								<div className="form-group">
									<input onChange={this.handleChange} className="h-100 form-control p-3 mb-3 signup-input" name="email" type="text" placeholder="Email"/>
								</div>
								<div className="form-group">
									<input onChange={this.handleChange} className="h-100 form-control p-3 mb-3 signup-input" name="password" type="password" placeholder="Password"/>
								</div>
								<div className="button d-flex justify-content-end">
									<button type="submit" className="btn w-20 btn-lg btn-success">sign up</button>
								</div>
							</form>
						</div>
						
  			</>   
			)
	}

}

export default Signup