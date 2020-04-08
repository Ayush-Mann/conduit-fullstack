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
			currentTag:null,
			globalFeed:true,
			tags:null
			
		}
	}
	handleGlobal=()=>{
		this.setState({
			globalFeed:true
		})
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
				currentTag:atrib,
				globalFeed:false
			}))
		

	}
	componentDidMount(){
		axios(`/api/tags`,{
			method:"GET",
			headers:{
				'content-type':'application/json'
			}
		}).then(res=>this.setState({
			tags:res.data
		}))
	}

	render(){
		return(
			<div>
        <Hero title="Conduit"/>
				<div className="container d-flex justify-content-between">
					<section className=" col-md-8">
						<div style={{width:'200px'}}>
							<div className="d-flex">
							<p onClick={this.handleGlobal} className="text-success ml-4" style={{cursor:"pointer"}}>Global Feed</p>
							{this.state.globalFeed?null:<p className="text-success ml-4" style={{cursor:"pointer"}}>{this.state.currentTag}</p>} 
							</div>
							<hr className="border border-success w-75 ml-0" />
						</div>
						{
							!this.state.globalFeed && this.state.tagArticles?this.state.tagArticles.map((article,index)=>{
								return(
									<div key={index} className="p-2">
									<div className="p-2 d-flex flex-row justify-content-between">
										<div className="d-flex">
											<img src="https://i.imgur.com/g5qR3O8.png" style={{width:"40px",borderRadius:"50%"}}/>
											<div className="ml-2">
												<h6 className="mb-1" style={{fontSize:"13px",fontWeight:"300",color:"grey"}}>{article.authorId.username}</h6>
												<small className="text-disable">Created At:{article.createdAt.split("T")[0]}</small>
											</div>
										</div>
										<div onClick={()=>{console.log("clicked")}} className="upvote-btn border border-success rounded p-2">
											<FaHeart color="rgb(102,184,92)"/>
											<span className="text-success">3</span>
										</div>

									{/* </div> */}
									</div>
											
									<div className="p-2">
										<h6 className="text-success mb-1">{article.title.toUpperCase()}</h6>
										<p className="text-dark ">{article.description}</p>
										<Link className="d-block text-secondary" style={{fontSize:"12px"}} to={`/articles/${article.slug}`}  ref={slug} onClick={this.handleClick} >Read more</Link>
									</div>
									<hr />
								</div>
								)
											

							}):this.props && this.props.articles ? this.props.articles.map((article,index)=>{
									return(
										<div key={index} className="p-2">
											
												<div className="p-2 d-flex flex-row justify-content-between">
													<div className="d-flex">
														<img src="https://i.imgur.com/g5qR3O8.png" style={{width:"40px",borderRadius:"50%"}}/>
														<div className="ml-2">
															<h6 className="mb-1" style={{fontSize:"13px",fontWeight:"300",color:"grey"}}>{article.authorId.username}</h6>
															<small className="text-disable">Created At:{article.createdAt.split("T")[0]}</small>
														</div>
													</div>
													<div onClick={()=>{console.log("clicked")}} className="upvote-btn border border-success rounded p-2">
														<FaHeart color="rgb(102,184,92)"/>
														<span className="text-success">3</span>
													</div>

												{/* </div> */}
												</div>
											
											<div className="p-2">
												<h6 className="text-success mb-1">{article.title.toUpperCase()}</h6>
												<p className="text-dark ">{article.description}</p>
												<Link className="d-block text-secondary" style={{fontSize:"12px"}} to={`/articles/${article.slug}`}  ref={slug} onClick={this.handleClick} >Read more</Link>
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
						this.props && this.state.tags!=null ? this.state.tags.map((tag,index)=>{
							return(
								<div onClick={()=>this.handleClick(tag)}  className="border rounded-pill p-1 mb-1" key={index} style={{backgroundColor:'rgb(129,138,145)',color:"white",fontSize:"12px",cursor:"pointer"}}>
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