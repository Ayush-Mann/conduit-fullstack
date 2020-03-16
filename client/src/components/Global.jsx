import React from "react"
import "../App.css"

import Hero from "./Home/Hero"
import { Link } from "react-router-dom"
import axios from "axios"
import {FaHeart} from "react-icons/fa"


const slug = React.createRef()

class Global extends React.Component{
	constructor(){
		super()
		this.state={
			userArticles:null,
			tagArticles:null,
			currentTag:null
			
		}
	}

	handleClick=(atrib)=>{
		axios(`api/articles?tag=${atrib}`,{
			method:"GET",
			headers:{
				"Content-Type":"application/json"
			}
		}).then(res=>
			// console.log(res)
			this.setState({
				tagArticles:res.data,
				currentTag:atrib
			}))
		

	}

	render(){
		return(
			<div>
        	<Hero />
				<div className="container d-flex justify-content-between">
					<section className=" col-md-8">
						<div style={{width:'200px'}}>
							<p className="text-success ml-4">{this.state.tagArticles?`${this.state.currentTag}`:"Global Feed"}</p>
							<hr className="border border-success w-75 ml-0" />
						</div>
						{
							this.state.tagArticles?this.state.tagArticles.map((article,index)=>{
								return(
									<div key={index} className="p-2">
									<div>
										<h6>{article.title}</h6>
										<small>{article.description}</small>
										<Link className="d-block" to={`/${article.slug}`}  ref={slug} onClick={this.handleClick} >Read more</Link>
									</div>
									<hr />
								</div>
								)
											

							}):this.props && this.props.articles ? this.props.articles.map((article,index)=>{
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
												<Link className="d-block" to={`/articles/${article.slug}`}  ref={slug} onClick={this.handleClick} >Read more</Link>
											</div>
											<hr />
										</div>
									)
								}):null
							
						}
				</section>
				<aside className="bg-light h-75  pb-3 border border-light aside-container">
					<p className="pt-3 pl-3">Popular tags</p>
					<div className="d-flex pl-3 flex-wrap ">
					{
						this.props && this.props.tags? this.props.tags.map((tag,index)=>{
							return(
								<div onClick={()=>this.handleClick(tag)}  className="border rounded-pill p-1 mb-1" style={{cursor:"pointer"}} key={index} style={{backgroundColor:'rgb(129,138,145)',color:"white",fontSize:"12px"}}>
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

export default Global