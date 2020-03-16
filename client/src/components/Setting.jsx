import React from "react"

class Setting extends React.Component{
    constructor(){
        super()
        this.state={
            user:null
        }
    }
    render(){
        return(
            <div className="container  font-size w-50">
                <h3 className="text-center p-2">Settings</h3>
                <form className="font-family">
                    <div className="form-group">
                        <input type="text" className="form-control text-muted"  placeholder="URL of profile picture" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control font-size "  placeholder={`${this.state.user}`} />
                    </div>
                    <div className="form-group">
                        <textarea className="form-control text-muted textarea" placeholder="Short bio about you" rows="7"></textarea>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control"  placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control"  placeholder="Enter password" />
                    </div>
                    <div className="button d-flex justify-content-end ">
                        <button type="submit"className="btn w-20 btn-lg px-4 btn-success">Update Setting</button>
                    </div>
                </form>
            </div>
        )
        
    }
}
export default Setting