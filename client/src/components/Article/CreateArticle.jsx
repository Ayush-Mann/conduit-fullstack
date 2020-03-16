import React from "react"
import "./style.css"
function CreateArticleForm(){
    return(
        <div className="container p-5 font-size w-75">
            <form className="font-family">
                <div className="form-group">
                    <input type="text" className="form-control input-title pl-4 text-muted"  placeholder="Article Title" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control font-size "  placeholder="Whats this article about?" />
                </div>
                <div className="form-group">
                    <textarea className="form-control text-muted textarea" rows="7">Write your Article (in markdown)</textarea>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control"  placeholder="Enter tags" />
                </div>
                <div className="button d-flex justify-content-end ">
                    <button type="submit"className="btn w-20 btn-lg px-4 btn-success">Publish Article</button>
                </div>
            </form>
        </div>

    )
}

export default CreateArticleForm