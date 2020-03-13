import React from "react"
import { Link, NavLink } from "react-router-dom"
import "../../App.css"

function Header(){
    return(
            <nav className="navbar navbar-expand-lg navbar-light" style={{width:"700px"}}>
            	<div className="header-container d-flex justify-content-between">
								<Link className="navbar-brand" style={{"color":"rgb(92,184,92)",fontWeight:"bold",fontSize:"22px"}} to="#">conduit</Link>
								<div className="collapse navbar-collapse" id="navbarSupportedContent">
									<div className="navbar-nav">
										<NavLink className="nav-link nav-item navFont" to="/">Home</NavLink>
										<NavLink className="nav-link nav-item navFont" to="/login">Sign in</NavLink>
										<NavLink className="nav-link nav-item navFont" to="/register">Sign up</NavLink>  
									</div>
								</div>	
							</div>
            </nav>
        
    )
}
export default Header