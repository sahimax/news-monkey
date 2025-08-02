import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./component/Navi.css";
import Nabar from "./component/Navi";
import News from "./component/News";
import "./App.css";
import {
  BrowserRouter as Router, Route,Link,Routes, BrowserRouter,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';



export default class App extends Component {
 
   apikey=  import.meta.env.VITE_NEWS_API;

  state={
    progress:0,
    pageSize: 9
  }
  
  setProgress=(progress)=>{
    this.setState({progress: progress});
  };

  handleResize = () => {
    if (window.innerWidth < 768) {
      this.setState({ pageSize: 5 }); // smaller pageSize for smaller devices
    } else {
      this.setState({ pageSize: 9 }); // larger pageSize for larger devices
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Nabar />
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      
      />
          <Routes>
            <Route
              path="/"
              element={
                <News setProgress={this.setProgress} pageSize={this.state.pageSize} apikey={this.apikey} key="general" company="tesla" />
              }
            />
            <Route
              path="/apple"
              element={
                <News  setProgress={this.setProgress} pageSize={this.state.pageSize} apikey={this.apikey} key="apple" company="apple" />
              }
            />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
