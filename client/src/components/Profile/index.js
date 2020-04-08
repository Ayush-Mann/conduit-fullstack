import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Spinner from "../common/Spinner"
import Hero from "../Home/Hero"

class Profile extends React.Component{
    constructor(){
        super()
        this.state={
            profileArticles:null,
            myArticleFeed:true,
            favouritedArticle:null
        }
    }

    componentDidMount(){
        // axios(`/api/articles?author=${this.props.match.params.username}`,{
        //     method:"GET",
        //     headers:{
        //         "Content-Type":"applicaion/json",
        //         "authorization":localStorage.token||""
        //     }
        // }).then(res=>
        //     this.setState({
        //         profileArticles:res.data
        //     })
            
        // )

        const myarticles = axios(`/api/articles?author=${this.props.match.params.username}`,{
            method:"GET",
            headers:{
                'content-type':'application/json'
            }
        })

        const favouritedArticles = axios(`/api/user/${this.props.match.params.username}/favourited`,{
            method:"GET",
            headers:{
                'content-type':'application/json',
                'authorization':localStorage.token||''
            }
        })

        Promise.all([myarticles,favouritedArticles])
        .then(res=>{console.log(res[0])
            return this.setState({
                profileArticles:res[0].data,
                favouritedArticle:res[1].data
            })
        })
        // .then(res=>this.setState({
        //     myArticleFeed:res[0][0].data,
        //     // favouritedArticle:res[1].data
        // }))
    }
    handleMyArticle=()=>{
        this.setState({
            myArticleFeed:true
        })
    }
    handleFavArticle=()=>{
        this.setState({
            myArticleFeed:false
        })
    }
    
    render(){
        return(
            <>
            <Hero title={this.props.match.params.username} currentUser={this.props.currentUser} followFunction={this.props.followUser}/>
            <div className="container p-4">
                <div className="col-md-8">
                <div style={{width:'200px'}}>
                    <div className="d-flex">
                    <p onClick={this.handleMyArticle} className="text-success ml-4" style={{cursor:"pointer"}}>My Articles</p>
                    <p onClick={this.handleFavArticle} className="text-success ml-4" style={{cursor:"pointer"}}>Favourite Articles</p> 
                    </div>
                    <hr className="border border-success w-75 ml-0" />
                </div>
                {
                    this.state.myArticleFeed &&
                    this.state.profileArticles ? this.state.profileArticles.map(article=>{
                        return(<>
                            <div className="p-2">
										<div className="d-flex">
											<img src="https://i.imgur.com/g5qR3O8.png" style={{width:"50px",borderRadius:"50%"}}/>
											<div className="ml-2">
                                                <p className="text-success">{article.title}</p>
												{/* <h6 className="mb-1" style={{fontSize:"13px",fontWeight:"300",color:"grey"}}>{article.authorId.username}</h6> */}
												<small className="text-disable">Created At:{article.createdAt.split("T")[0]}</small>
                                            </div>
										</div>
                                        <p className="p-3">{article.description}</p>
                                        <Link className="text-secondary pl-3" style={{fontSize:"14px"}} to={`/articles/p/${article.slug}`}>Read more</Link>
                                        <div>
                                        </div>
									{/* </div> */}
									</div>
                                    <hr />
                        </>)

                    }):this.state.favouritedArticle ? this.state.favouritedArticle.favouriteArticles.map(article=>{
                        return(
                            <>
                            <div className="p-2">
										<div className="d-flex">
											<img src="https://i.imgur.com/g5qR3O8.png" style={{width:"50px",borderRadius:"50%"}}/>
											<div className="ml-2">
                                                <p className="text-success">{article.title}</p>
												{/* <h6 className="mb-1" style={{fontSize:"13px",fontWeight:"300",color:"grey"}}>{article.authorId.username}</h6> */}
												<small className="text-disable">Created At:{article.createdAt.split("T")[0]}</small>
                                            </div>
										</div>
                                        <p className="p-3">{article.description}</p>
                                        <Link className="text-secondary pl-3" style={{fontSize:"14px"}} to={`/articles/p/${article.slug}`}>Read more</Link>
                                        <div>
                                        </div>
									{/* </div> */}
									</div>
                                    <hr />
                            </>
                        )
                    })
                    :<Spinner />
                }
                </div>
            </div>
            </>
        )
    }
}

export default Profile