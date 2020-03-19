import React from "react"
import axios from "axios"

class Profile extends React.Component{
    constructor(){
        super()
        this.state={
            myArticles:null,
            myArticleFeed:true
        }
    }

    componentDidMount(){
        axios("/api/user",{
            method:"GET",
            headers:{
                "Content-Type":"applicaion/json",
                "authorization":localStorage.token||""
            }
        }).then(res=>
            this.setState({
                myArticles:res.data
            }))
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
                    this.state.myArticleFeed ? (
                        <h1>MyFeed</h1>
                    ):(<h1>Fav Articles</h1>)
                }
                </div>
            </div>
        )
    }
}

export default Profile