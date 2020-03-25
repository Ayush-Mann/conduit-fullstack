import React from "react"

class Setting extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:this.props.user || null,
            email:null,
            username:null,
        }
    }
    handleChange =(event)=>{
        let {name,value}=event.target
        this.setState({
            [name]:value
        })
    }
    
    render(){
        return(
            <div className="container  font-size w-50">
            {console.log(this.state.user)}
                <h3 className="text-center p-2">Settings</h3>
                <form className="font-family">
                    <div className="form-group">
                        <input type="text"  className="form-control text-muted"  placeholder="URL of profile picture" />
                    </div>
                    <div className="form-group">
                        <input name="username" value={this.state.username}  onChange={this.handleChange} type="text" className="form-control font-size "  placeholder={`${this.state.user.username}`} />
                    </div>
                    <div className="form-group">
                        <textarea className="form-control text-muted textarea" placeholder="Short bio about you" rows="7"></textarea>
                    </div>
                    <div className="form-group">
                        <input name="email" value={this.state.username} onChange={this.handleChange} type="email" className="form-control"  placeholder={`${this.state.user.email}`} />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control"  placeholder="Enter password" />
                    </div>
                    <div className="d-flex flex-row-reverse">
                        <div className="button d-flex justify-content-end">
                            <button type="submit"className="btn w-20 btn-lg px-4 btn-success">Update Setting</button>
                        </div>
                        <div className="button d-flex justify-content-end mr-2">
                            <button onClick={()=>this.props.Logout()} type="submit"className="btn w-20 btn-md px-4 btn-success">Log out</button>
                        </div>

                    </div>
                </form>
            </div>
        )
        
    }
}
export default Setting