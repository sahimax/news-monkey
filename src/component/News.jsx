import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Button from "react-bootstrap/Button";
import Spinner from "./spinner";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    company: "tesla",
  };

  // static propTypes= {
  //   company: propTypes.string,
  // }

  constructor() {
    super();
    console.log("Hello I am a constructor from news");
    this.state = {
      articles: [],
      page: 1,
      loading: true,
      totalResults:0,
    };
  }
  async updateNews(pageNo) {
    this.props.setProgress(10);

    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/everything?q=${this.props.company}&from=2024-08-21&to=2024-08-21&sortBy=popularity&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50)
    // let totalResults = parsedData.totalResults;
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }

  async componentDidMount() {
    // //  let url ="https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=8e8d672f09ba45048a86e2482f0efbcd&page=1&pageSize=6";
    // this.setState({ loading: true });
    // let url = `https://newsapi.org/v2/everything?q=${this.props.company}&from=2024-08-21&to=2024-08-21&sortBy=popularity&apiKey=8e8d672f09ba45048a86e2482f0efbcd&page=1&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // // let totalResults = parsedData.totalResults;
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false, 
    // });
    //  console.log(parsedData)
    // //  console.log(totalResults)

    this.updateNews();
  }

  handlePreClick= async ()=>{
    await this.updateNews(this.state.page -1);
    this.setState({page:this.state.page -1,
      loading:false
    });
  }
  handleNextClick= async ()=>{
    await this.updateNews(this.state.page +1);
    this.setState({page:this.state.page +1,
      loading:false
    });
  }


  // handlePreClick = async () => {
  //   console.log("pre");
  //   // if (
  //   //   !(
  //   //     this.state.page + 1 >
  //   //     Math.ceil(this.totalResults / this.props.pageSize)
  //   //   )
  //   // ) {
  //   //   let url = `https://newsapi.org/v2/everything?q=${
  //   //     this.props.company
  //   //   }&from=2024-08-21&to=2024-08-21&sortBy=popularity&apiKey=8e8d672f09ba45048a86e2482f0efbcd&page=${
  //   //     this.state.page - 1
  //   //   }&pageSize=${this.props.pageSize}`;
  //   //   this.setState({ loading: true });
  //   //   let data = await fetch(url);
  //   //   let parsedData = await data.json();

  //   //   this.setState({
  //   //     articles: parsedData.articles,
  //   //     page: this.state.page - 1,
  //   //     loading: false,
  //   //   });
  //   // }
   
  //   await this.updateNews();

  //   if (
  //     !(
  //       this.state.page + 1 >
  //       Math.ceil(this.totalResults / this.props.pageSize)
  //     )
  //   ) {
  //     this.setState({ page: this.state.page - 1 });
  //   }
    

    
  // };

  // handleNextClick = async () => {
  //   // let url = `https://newsapi.org/v2/everything?q=${
  //   //   this.props.company
  //   // }&from=2024-08-21&to=2024-08-21&sortBy=popularity&apiKey=8e8d672f09ba45048a86e2482f0efbcd&page=${
  //   //   this.state.page + 1
  //   // }&pageSize=${this.props.pageSize}`;
  //   // this.setState({ loading: true });
  //   // let data = await fetch(url);

  //   // let parsedData = await data.json();
  //   // this.setState({
  //   //   articles: parsedData.articles,
  //   //   page: this.state.page + 1,
  //   //   loading: false,
  //   // });


   
  //   await this.updateNews();
  //   console.log("next");
  
  //   this.setState({ page: this.state.page + 1 });
   
  // };

  fetchMoreData= async()=>{
    this.setState({page: this.state.page + 1})

    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/everything?q=${this.props.company}&from=2024-08-21&to=2024-08-21&sortBy=popularity&apiKey=8e8d672f09ba45048a86e2482f0efbcd&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // let totalResults = parsedData.totalResults;
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,

    });
  }

  render() {
    return (
      <>
        <div className="container my-3">
          {this.state.loading && <Spinner/>}
          <h2>Top-News</h2>


          
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
          <div className="row">
            {this.state.articles.map((e) => {
              return (
                <div className="col-md-4 my-4 " key={e.url}>
                  <Newsitem
                    card_title={
                      e.title.length >= 10 ? e.title.slice(0, 40) : e.title
                    }
                    card_des={
                      e.description.length >= 10
                        ? e.description.slice(0, 200)
                        : e.description
                    }
                    imgurl={e.urlToImage}
                    newsurl={e.url}
                    date={e.publishedAt}
                    author={e.author}
                    source={e.source.name}
                  />
                </div>
              );
            })}
            
          </div>
          </div>

          </InfiniteScroll>
          
          // 
        </div>
      </>
    );
  }
}

export default News;
