import React from "react"
// import Herologged from "./Herologged"
import Hero from "./Hero"
import Feed from "./Feed/index"
import axios from "axios"
import {FaHeart} from "react-icons/fa"
import { Link } from "react-router-dom"
import Spinner from "../common/Spinner"

const slug = React.createRef()

class Home extends React.Component{
	constructor(){
		super()
		this.state={
            userArticles:null,
			globalfeed:true,
			tagArticles:null,
			currentTag:null,
			updated:[],
			tags:null
		}
	}
    handleClickFeed=()=>{
        this.setState({
            globalfeed: false
        })
    }
    handleClickGlobal =()=>{
        this.setState({
			globalfeed: true,
			tagArticles:null
        })
	}
	componentDidMount(){
		// axios("/api/articles/feed",{
		// 	method:"GET",
		// 	headers:{
		// 		"Content-Type":"application/json",
		// 		"authorization":localStorage.token || ""
		// 	}
		// }).then(res =>
		// 	// res=> this.setState({
		// 	// 	userArticles:res.data
		// 	// })
		// 	console.log(res)
			
		// )

		const tagArticles = axios(`/api/tags`,{
			method:"GET",
			headers:{
				'content-type':'application/json'
			}
		})
		const articles = axios("/api/articles",{
			method:"GET",
			headers:{
				"Content-Type":"application/json"
			}
		})
		Promise.all([tagArticles, articles])
		.then(res=>
			this.setState({
				updated:res[1].data,
				tags:res[0].data
			})
		)
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
				
			}))
		

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
							{this.state.tagArticles ?<p className="text-success ml-4 p-0" style={{cursor:"pointer"}}>{this.state.currentTag}</p>:null} 	
						</div>
						
						{
							this.state.tagArticles?this.state.tagArticles.map((article,index)=>{
								return(
									<div key={index} className="p-2">
									<div className="p-2 d-flex flex-row justify-content-between">
										<div className="d-flex">
											<img src="https://i.imgur.com/g5qR3O8.png" style={{width:"40px",borderRadius:"50%"}}/>
											<div className="ml-2">
												<Link className="" to={`/profile/${article.authorId.username}`}><h6 className="mb-1" style={{fontSize:"13px",fontWeight:"300",color:"grey"}}>{article.authorId.username}</h6></Link>
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
										<Link className="d-block text-secondary" style={{fontSize:"12px"}} to={`/articles/p/${article.slug}`}  ref={slug} onClick={this.handleClick} >Read more</Link>
									</div>
									<hr />
								</div>
								)
											

							}):
							this.state.globalfeed && this.state.updated ? this.state.updated.map((article,index)=>{
								return(

									<div key={index} className="p-2">
										<div className="p-2">
											<div className="d-flex flex-row justify-content-between">
												<div className="d-flex">
													<img className="" src="https://i.imgur.com/g5qR3O8.png" style={{width:"40px",borderRadius:"50%"}}/>
													<div className="ml-2">
													<Link className="" to={`/profile/${article.authorId.username}`}><h6 className="mb-1" style={{fontSize:"13px",fontWeight:"300",color:"grey"}}>{article.authorId.username}</h6></Link>
														<small className="text-disable">Created At:{article.createdAt.split("T")[0]}</small>
													</div>

												</div>
												<div onClick={()=>{console.log("clicked")}} className="upvote-btn border border-success rounded p-2">
													<FaHeart color="rgb(102,184,92)"/>
													<span className="text-success">3</span>
												</div>
											</div>
										</div>
										<div className="p-2">
											<h6 className="text-success mb-1">{article.title.toUpperCase()}</h6>
											<p className="text-dark ">{article.description}</p>
											<Link className="d-block text-secondary" style={{fontSize:"12px"}} to={`/articles/p/${article.slug}`}  ref={slug} onClick={this.handleClick} >Read more</Link>
										</div>
										<hr />
									</div>
								)
                            }):<Spinner />
                            
                            
						}
						
				</section>
				<aside className="bg-light h-75  pb-3 border border-light aside-container">
					<p className="pt-3 pl-3">Popular tags</p>
					<div className="d-flex pl-3 flex-wrap ">
					{
						this.props && this.state.tags? this.state.tags.map((tag,index)=>{
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

export default Home