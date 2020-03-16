import React from "react"
// import Herologged from "./Herologged"
import Hero from "./Hero"
import Feed from "./Feed/index"
import axios from "axios"
import {FaHeart} from "react-icons/fa"
import { Link } from "react-router-dom"

const slug = React.createRef()

class Home extends React.Component{
	constructor(){
		super()
		this.state={
            userArticles:null,
            globalfeed:true
			
		}
	}
    handleClickFeed=()=>{
        this.setState({
            globalfeed: false
        })
    }
    handleClickGlobal =()=>{
        this.setState({
            globalfeed: true
        })
    }
	render(){
		return(
			<div>
				<div className="container d-flex justify-content-between mt-5">
					<section className=" col-md-8">
						<div className="d-flex">
                            <div>
							 <button onClick={this.handleClickFeed} className="text-success ml-4 bg-white border-0 border-success">Your Feed</button>
                            </div>
                            <div>
                             <button onClick={this.handleClickGlobal} className="text-success ml-4 bg-white border-0 border-success">Global Feed</button>
                            </div>	
						</div>
						{
							this.state.globalfeed && this.props && this.props.articles ? this.props.articles.map((article,index)=>{
								return(
									<div key={index} className="p-2">
										<div className="p-2">
											<div className="d-flex flex-row justify-content-between">
											<img className="" src="https://i.imgur.com/g5qR3O8.png" style={{width:"40px",borderRadius:"50%"}}/>
												{/* h6 for author name and small for timestamps */}
												<>
													<h6></h6>
													<small></small>
												</>
												<div onClick={()=>{console.log("clicked")}} className="upvote-btn border border-success rounded p-2">
													<FaHeart color="rgb(102,184,92)"/>
													<span className="text-success">3</span>
												</div>
											</div>
										</div>
										<div>
											<h6>{article.title}</h6>
											<small>{article.description}</small>
											<Link className="d-block" to="#"  ref={slug} onClick={this.handleClick} >Read more</Link>
										</div>
										<hr />
									</div>
								)
                            }):(
                                null
                            )
                            
						}
				</section>
				<aside className="bg-light h-75  pb-3 border border-light aside-container">
					<p className="pt-3 pl-3">Popular tags</p>
					<div className="d-flex pl-3 flex-wrap ">
					{
						this.props && this.props.tags? this.props.tags.map((tag,index)=>{
							return(
								<div className="border rounded-pill p-1 mb-1" key={index} style={{backgroundColor:'rgb(129,138,145)',color:"white",fontSize:"12px"}}>
									{tag}
								</div>
							)
						}):null
					}

					</div>

				</aside>
        </div>
      </div>
    )
	}
}

export default Home