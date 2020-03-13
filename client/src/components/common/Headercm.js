import React from "react"
import { Link, NavLink } from "react-router-dom"
import { FaRegEdit } from 'react-icons/fa'
import { IoIosSettings } from "react-icons/io"


class Headercm extends React.Component{
    constructor(){
        super()
        this.state={
            currentUser:null
        }
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light" style={{width:"700px"}}>
            	<div className="header-container d-flex justify-content-between">
								<Link className="navbar-brand" style={{"color":"rgb(92,184,92)",fontWeight:"bold",fontSize:"22px"}} to="#">conduit</Link>
								<div className="collapse navbar-collapse" id="navbarSupportedContent">
									<div class="navbar-nav">
										<NavLink className="nav-link nav-item navFont" to="/">Home</NavLink>
										<NavLink className="nav-link nav-item navFont" to="/articles/create"><FaRegEdit size="15" className="mr-1"/>New Post</NavLink>
										<NavLink className="nav-link nav-item navFont" to="/settings"><IoIosSettings className="mr-1"/>Settings</NavLink>
                                        <NavLink className="nav-link nav-item navFont" to="#">{`${this.state.currentUser}`}</NavLink>  
                                        
                                    </div>
								</div>	
							</div>
            </nav>
        )
    }
}

export default Headercm