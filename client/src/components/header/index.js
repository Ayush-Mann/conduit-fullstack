import React from "react"
import { Link, NavLink } from "react-router-dom"
import "../../App.css"

function Header(){
    return(
            <nav className="navbar navbar-expand-lg navbar-light">
            	<div className="header-container header container">
								<Link className="navbar-brand col-md-8 " style={{"color":"rgb(92,184,92)",fontWeight:"bold",fontSize:"22px"}} to="#">conduit</Link>
								<div className="collapse navbar-collapse header-link" id="navbarSupportedContent">
									<div>
										<div className="navbar-nav ">
											<NavLink activeClassName="text-dark" className="nav-link nav-item navFont" to="/">Home</NavLink>
											<NavLink activeClassName="text-dark" className="nav-link nav-item navFont" to="/login">Sign in</NavLink>
											<NavLink activeClassName="text-dark" className="nav-link nav-item navFont" to="/register">Sign up</NavLink>  
										</div>
									</div>
								</div>	
							</div>
            </nav>
        
    )
}
export default Header