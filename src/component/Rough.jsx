import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Button from 'react-bootstrap/Button';
import Spinner from './spinner';

export class News extends Component {
  constructor(){
    super();
    console.log("Hello I am a constructor from news");
    this.state={
      articles:[],
      page:1,
loading:false,
      totalResult:[]
   
    }
    }

async componentDidMount(){

//  let url ="https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=8e8d672f09ba45048a86e2482f0efbcd&page=1&pageSize=6";
 
let url=`https://newsapi.org/v2/everything?q=apple&from=2024-08-21&to=2024-08-21&sortBy=popularity&apiKey=8e8d672f09ba45048a86e2482f0efbcd&page=1&pageSize=${this.props.pageSize}`
 let data = await fetch(url);
 let parsedData = await data.json()
 let totalResults=parsedData.totalResults
 this.setState({
  articles: parsedData.articles,
 

 })
//  console.log(parsedData)
//  console.log(totalResults)

}

handlePreClick= async()=>{
console.log("pre");
if(!(this.state.page +1> Math.ceil(this.totalResults/this.props.pageSize))){
let url =`https://newsapi.org/v2/everything?q=apple&from=2024-08-21&to=2024-08-21&sortBy=popularity&apiKey=8e8d672f09ba45048a86e2482f0efbcd&page=${this.state.page -1}&pageSize=${this.props.pageSize}`
 this.setState({loading:true});
let data = await fetch(url);
 let parsedData = await data.json();
 
 this.setState({
  articles: parsedData.articles,
  page: this.state.page-1,
    loading:false,
   });
}



}


handleNextClick= async()=>{
 let url =`https://newsapi.org/v2/everything?q=apple&from=2024-08-21&to=2024-08-21&sortBy=popularity&apiKey=8e8d672f09ba45048a86e2482f0efbcd&page=${this.state.page +1}&pageSize=${this.props.pageSize}`
 this.setState({loading:true});
 let data = await fetch(url);
 
 let parsedData = await data.json()
 this.setState({
  articles: parsedData.articles,
  page: this.state.page+1,
  loading:false,
 });

 console.log("next")
}

  render() {

    return (

      <>
      <div className="container my-3">
     { this.state.loading && <Spinner/>}
      <h2>Top-News</h2>


      <div className='row'>

      {this.state.articles.map((e)=>{
        return<div className="col-md-4 my-4" key={e.url}>
      <Newsitem card_title={(e.title).length >= 10? e.title.slice(0,40) : e.title} card_des={(e.description).length >= 10? e.description.slice(0,200): e.description} imgurl={e.urlToImage} newsurl={e.url}/>
      </div>
 
      
  
})}
      
      </div>

      <div className="container d-flex justify-content-between">

      <Button variant="primary" disabled={this.state.page <=1} onClick={this.handlePreClick}> &larr;Prev</Button>{' '}
      <Button variant="primary" disabled={this.state.page +1> Math.ceil(this.totalResults/this.props.pageSize)} onClick={this.handleNextClick}>Next &rarr;</Button>{' '}
      </div>
      
      </div>
   
      
   
      </>
    )
  }
}

export default News
