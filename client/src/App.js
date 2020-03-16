import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
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

class App extends React.Component{
  constructor(){
    super();
    this.state={
      articles:null,
      tags:null,
      currentUser:localStorage.token ? true : false
    }
  }
  userLogIn=()=>{
    return(
      this.setState({
        currentUser:true
      })
    )
  }
 
  componentDidMount(){
    const articles = axios("/api/articles",{
      method:"GET",
      headers:{
          "Content-Type":"application/json"
      }
    })
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

  // privateRoutes=()=>{
  //   return(
  //     <>
  //        <Route exact path="/home">
  //         <Home userStatus={this.state.currentUser} articles={this.state.articles} tags={this.state.tags}/>
  //       </Route>
      
  //       <Route path="/articles/create">
  //         <CreateArticleForm />
  //       </Route>
  //       <Route path="/setting">
  //         <Setting />
  //       </Route>
  //     </>
  //   )
  // }

  // publicRoutes=()=>{
  //   return(
  //     <>
  //        <Route exact path="/">
  //         <Global articles={this.state.articles} tags={this.state.tags}/>
  //       </Route>
  //       <Route path="/register">
  //         <Signup />
  //       </Route>
  //       <Route path="/login">
  //         <Login userLogged={this.userLogIn} />
  //       </Route>
  //       <Route exact path="/home">
  //         <Home userStatus={this.state.currentUser} articles={this.state.articles} tags={this.state.tags}/>
  //       </Route>
      
  //       <Route path="/articles/create">
  //         <CreateArticleForm />
  //       </Route>
  //       <Route path="/setting">
  //         <Setting />
  //       </Route>
  //     </>
  //   )
  // }
  render(){
    return(
      <>
        {
          localStorage.token ? <Headercm currentUser={this.state.currentUser}/>:<Header />
        }
         <Route exact path="/">
          <Global articles={this.state.articles} tags={this.state.tags}/>
        </Route>
        <Route path="/register">
          <Signup />
        </Route>
        <Route path="/login">
          <Login userLogged={this.userLogIn} />
        </Route>
        <Route exact path="/home">
          <Home userStatus={this.state.currentUser} articles={this.state.articles} tags={this.state.tags}/>
        </Route>
      
        <Route path="/articles/create">
          <CreateArticleForm />
        </Route>
        <Route path="/setting">
          <Setting />
        </Route>
        <Route path="/home/tags/:tag">
          <Global />
        </Route>
        <Route path="/articles/:slug">
          <SingleArticle />
        </Route>
        
       
      </>
    )
  }
}

export default App;
