import React from 'react';
import {BrowserRouter as Router, Route, Switch,withRouter} from "react-router-dom"
import './App.css';
import axios from "axios"

import Headercm from "./components/common/Headercm"
import Header from "./components/header/index"
import Login from "./components/signing/Login"
import Signup from "./components/signing/Signup.jsx"
import Home from "./components/Home/index"
import Global from "./components/Global"
import CreateArticleForm from './components/Article/CreateArticle';
import SingleArticle from "./components/Article/SingleArticle"
import Setting from "./components/Setting"
import Profile from "./components/Profile/index"

class App extends React.Component{
  constructor(){
    super();
    this.state={
      articles:null,
      tags:null,
      currentUser:localStorage.token ? true : false,
      userInfo:null
    }
  }
  userLogIn=()=>{
    return(
      this.setState({
        currentUser:true
      })
    )
  }

  userLoggedOut=()=>{
    this.setState({
      currentUser:false
    })
    localStorage.clear();
    this.props.history.push('/')
  }
 
  componentDidMount(){
    axios('/api/user',{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "authorization":localStorage.token||""
      }
    }).then(res=>this.setState({
      userInfo:res.data
    }))
    const articles = axios("/api/articles",{
      method:"GET",
      headers:{
          "Content-Type":"application/json"
      }
    });
    const tags = axios("/api/tags",{
      method:"GET",
      headers:{
          "Content-Type":"application/json"
      }
    })
    Promise.all([articles, tags]).then(res=>
      this.setState({
        articles: res[0].data,
        tags: res[1].data
        
      })
    )
  }
  
  privateRoutes=()=>{
    console.log('called in private')

    return(
      <Switch>
        {console.log("private")}
        <Route exact path="/">
          <Global articles={this.state.articles} tags={this.state.tags} />
        </Route>
        <Route path="/articles/create" render={(props)=> <CreateArticleForm {...props} />} />
        <Route path="/articles/p/:slug" component={SingleArticle} />
        <Route path="/setting">
          <Setting user={this.state.userInfo && this.state.userInfo} Logout={this.userLoggedOut}/>
        </Route>
        <Route path="/profile/:username" render={(props)=><Profile {...props}/>} />
        <Route exact path="/home">
          <Home userStatus={this.state.currentUser} articles={this.state.articles} tags={this.state.tags}/>
        </Route>
        <Route path="/*" render={()=><h1>404 page</h1>}/>
      </Switch>
    )
  }

  publicRoutes=()=>{
    console.log('called in public')
    return(
      <Switch>
         <Route exact path="/">
          <Global articles={this.state.articles} tags={this.state.tags} />
        </Route>
        <Route path="/register">
          <Signup />
        </Route>
        <Route path="/login">
          <Login userLogged={this.userLogIn} />
        </Route>
        <Route path="/profile/:username" render={(props)=><Profile {...props}/>} />
        <Route exact path="/articles/p/:slug" component={SingleArticle} />
        <Route exact path="/home/tags/:tag">
          <Global />
        </Route>
       
        <Route path="/*" render={()=><h1>404 page</h1>}/>
      </Switch>
    )
  }
  render(){
    return(
      <>
        {
          localStorage.token && this.state.userInfo ? <Headercm currentUser={this.state.userInfo}/>:<Header />
        }
         
        {
          localStorage.token && this.state.userInfo ?this.privateRoutes():this.publicRoutes()
        }
       
      </>
    )
  }
}

export default withRouter(App);
