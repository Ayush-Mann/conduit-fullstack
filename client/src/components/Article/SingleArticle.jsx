import React from "react"
import axios from "axios"

class SingleArticle extends React.Component{
    constructor(props){
        super(props)
        this.state={
            currrentArticle:null,
            
        }
    }
    componentDidMount(){
        axios(`/api/articles/article1-test-by-ayush2`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>
            // console.log("curret ar",res.data)
            this.setState({
                currrentArticle:res.data
            })
        )
    }
    render(){
    
        return(this.state.currrentArticle?
        (
            <>
                <div className="bg-dark container-fluid text-white">
                    <div className="container p-2 pl-4">
                        <h1 className="">{this.state.currrentArticle.title}</h1>
                        <small>created at</small>
                    </div>
                </div>
                <section className="container p-2 pl-4">
                    {this.state.currrentArticle.description}
                </section>
            </>
        )
        :null)
    }
}

export default SingleArticle