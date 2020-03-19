import React from "react"
import "./style.css"
import axios from "axios"

class CreateArticleForm extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            title:"",
            description:"",
            body:"",
            taglist:[]
        }
    }
    
    
    handleSubmit=(e,props)=>{
        e.preventDefault()
        axios("/api/articles",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":localStorage.token||""
            },
            data:{title:this.state.title,description:this.state.description,body:this.state.body,taglist:this.state.taglist}
        }).then(
            this.props.history.push('/home')
        )
    }
    handleChange=(event)=>{
        let {name, value}= event.target
        this.setState({
            [name]:value
        })
    }
    render(){
        return(
        <div className="container p-5 font-size w-75">
            <form className="font-family" onSubmit={this.handleSubmit}> 
                <div className="form-group">
                    <input name="title" onChange={this.handleChange}value={this.state.title} type="text" className="form-control input-title pl-4 text-muted"  placeholder="Article Title" />
                </div>
                <div className="form-group">
                    <input name="description"type="text" onChange={this.handleChange}value={this.state.description} className="form-control font-size "  placeholder="Whats this article about?" />
                </div>
                <div className="form-group">
                    <textarea name="body" onChange={this.handleChange}value={this.state.body} className="form-control text-muted textarea" rows="7">Write your Article (in markdown)</textarea>
                </div>
                <div className="form-group">
                    <input name="taglist" value={this.state.taglist} onChange={this.handleChange} type="text" className="form-control"  placeholder="Enter tags" />
                </div>
                <div className="button d-flex justify-content-end ">
                    <button type="submit"className="btn w-20 btn-lg px-4 btn-success">Publish Article</button>
                </div>
            </form>
        </div>

    )}
}

export default CreateArticleForm