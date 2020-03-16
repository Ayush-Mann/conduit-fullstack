import React from "react"
import "./style.css"
import { Link, NavLink } from "react-router-dom"
import { FaRegEdit } from 'react-icons/fa'
import { IoIosSettings } from "react-icons/io"


class Headercm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            currentUser:null
        }
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light " >
            	<div className="header-container headercm container">
                    <Link className="navbar-brand col-md-8" style={{"color":"rgb(92,184,92)",fontWeight:"bold",fontSize:"22px"}} to="/home">conduit</Link>
                    <div>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <div className="navbar-nav">
                            <NavLink activeClassName="text-dark" className="nav-link nav-item navFont" to="/home">Home</NavLink>
                            <NavLink activeClassName="text-dark" className="nav-link nav-item navFont" to="/articles/create"><FaRegEdit size="15" className="mr-1"/>New Post</NavLink>
                            <NavLink activeClassName="text-dark" className="nav-link nav-item navFont" to="/setting"><IoIosSettings className="mr-1"/>Settings</NavLink>
                            <NavLink activeClassName="text-dark" className="nav-link nav-item navFont" to="#">{this.props.currentUser ? 'Profile':null}</NavLink>  
                            
                        </div>
                    </div>	
                </div>
            </div>
            </nav>
        )
    }
}

export default Headercm