import React from 'react';
import axios from 'axios';
import Hero from "../Home/Hero"
import { Link } from 'react-router-dom';

class SingleArticle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            currrentArticle: null,
            commentContent:null,
            comments:[]
		};
	}
	componentDidMount() {
        console.log(this.props, 'cdm');
        const article = axios(`/api/articles/${this.props.match.params.slug}`,{
            method:"GET",
            headers:{
				'Content-Type': 'application/json'
			}
        }) 
        const comments = axios(`/api/articles/${this.props.match.params.slug}/comments`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            }
        })

        Promise.all([article,comments])
        .then(res=> this.setState({
            currrentArticle:res[0].data,
            comments:res[1].data.comments
        }))

		// axios(`/api/articles/${this.props.match.params.slug}`, {
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	}
		// }).then((res) =>
		// 	// console.log("curret ar",res.data)
		// 	this.setState({
		// 		currrentArticle: res.data
		// 	})
		// );
    }
    handleChange=(e)=>{
        let {name, value}= e.target
        this.setState({
            [name]:value
        })
    }
    postingComment=()=>{
        axios(`/api/articles/${this.state.currrentArticle.slug}/comments`,{
            method:"POST",
            headers:{
                "authorization":localStorage.token||"",
                "Content-Type":"application/json"

            },
            data:{
                content:this.state.commentContent
            }
        })
    }
	render() {
		
		return this.state.currrentArticle ? (
			<>
			    <div className="bg-dark container-fluid text-white">
			        <div className="container p-2 pl-4">
			            <h1 className="">{this.state.currrentArticle.title}</h1>
			                <small>created at{this.state.currrentArticle.createdAt.split('T')[0]}</small>
			        </div>
			    </div>
			    <section className="container p-2 pl-4">
			        {this.state.currrentArticle.description}
                
                </section>
			    <div className=" container p-2 pl-4">
                <p>
			        {this.state.currrentArticle.body}
			    </p>
                <hr />
                {/* comment section using bootstrap */}
				<div className="m- row bootstrap snippets">
                    <div className="col-md-6 col-md-offset-2 col-sm-12">
                        <div className="comment-wrapper">
                            <div className="panel panel-info">
                                <div className="panel-heading">
                                    Comment panel
                                </div>
                                <div className="panel-body">
                                    <form>
                                        <textarea name="commentContent"  value={this.state.commentContent}onChange={this.handleChange} className="form-control" placeholder="write a comment..." rows="3"></textarea>
                                        <br />
                                        <button onClick={this.postingComment} type="button" className="btn btn-info pull-right">Post</button>
                                    </form>
                                    <div className="clearfix"></div>
                                    <hr />
                                    <ul className="media-list">
                                        <li className="media">
                                            <Link to="#" classNameName="pull-left">
                                                <img src="https://bootdey.com/img/Content/user_1.jpg" alt="" className="img-circle" />
                                            </Link>
                                            <div className="media-body">
                                                <span className="text-muted pull-right">
                                                    <small className="text-muted">30 min ago</small>
                                                </span>
                                                <strong className="text-success">@MartinoMont</strong>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                    Lorem ipsum dolor sit amet, <a href="#">#consecteturadipiscing </a>.
                                                </p>
                                            </div>
                                        </li>
                                        <li className="media">
                                            <Link to="#" classNameName="pull-left">
                                                <img src="https://bootdey.com/img/Content/user_2.jpg" alt="" className="img-circle" />
                                            </Link>
                                            <div className="media-body">
                                                <span className="text-muted pull-right">
                                                    <small className="text-muted">30 min ago</small>
                                                </span>
                                                <strong className="text-success">@LaurenceCorreil</strong>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                    Lorem ipsum dolor <a href="#">#ipsumdolor </a>adipiscing elit.
                                                </p>
                                            </div>
                                        </li>
                                        <li className="media">
                                            <Link href="#" className="pull-left">
                                                <img src="https://bootdey.com/img/Content/user_3.jpg" alt="" className="img-circle" />
                                            </Link>
                                            <div className="media-body">
                                                <span className="text-muted pull-right">
                                                    <small className="text-muted">30 min ago</small>
                                                </span>
                                                <strong className="text-success">@JohnNida</strong>
                                                <p>
                                                    Lorem ipsum dolor <a href="#">#sitamet</a> sit amet, consectetur adipiscing elit.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>`
            </div>

				
                
            </>
) : null;
                }
            }

export default SingleArticle;
