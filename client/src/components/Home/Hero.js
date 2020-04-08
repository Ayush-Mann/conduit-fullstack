import React from "react"
import { withRouter } from 'react-router-dom'

function Hero(props){
    return(
        <div className="jumbotron jumbotron-fluid bg-success container-fluid">
            <div className="container text-center ">
                <h4 className="display-4 font-weight-bold text-white">{props.title}</h4>
                <p className="lead font-weight-light text-white">A place to share knowledge</p>
                {
                    props.currentUser && props.currentUser.username !== props.match.params.username ? <button style={{background:'rgb(40,167,69)',border:'1px solid white',borderRadius:'4px',color:'white'}}>Follow</button>:null
                }
            </div>
		</div>
    )
}
export default withRouter(Hero)