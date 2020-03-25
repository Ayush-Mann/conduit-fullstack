import React from "react"

function Hero(props){
    return(
        <div className="jumbotron jumbotron-fluid bg-success container-fluid">
                        <div className="container text-center ">
    <h4 className="display-4 font-weight-bold text-white">{props.title}</h4>
						<p className="lead font-weight-light text-white">A place to share knowledge</p>
					</div>
				</div>
    )
}
export default Hero