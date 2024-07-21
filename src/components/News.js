import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import '../css/news.css'



export class News extends Component {
  static default = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,

  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  // async updateNews(){
  //   let nextPage = this.state.page + 1;

  //   if (nextPage > Math.ceil(this.state.totalResults / 20)) {
  //     // Do nothing if trying to go beyond the available pages
  //     return;
  //   }

  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=$${this.props.apiKey}&page=${this.props.page}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();

  //   this.setState({
  //     page: nextPage,
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults, // Update totalResults,
  //     loading: false
  //   });
  // }

  handleNext = async () => {
    this.props.setProgress(0);
    let nextPage = this.state.page + 1;

    if (nextPage > Math.ceil(this.state.totalResults / this.props.pageSize)) {
      // Do nothing if trying to go beyond the available pages
      return;
    }

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: nextPage,
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);

  }


  handlePrevios = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
    // this.setState({page : this.state.page - 1})
    // this.updateNews()
  }
  fetchMoreData = async () => {
    // Increment the page number
    const nextPage = this.state.page + 1;

    // Check if we have reached the end of the available pages
    if (nextPage > Math.ceil(this.state.totalResults / this.props.pageSize)) {
      return; // Do nothing if trying to go beyond the available pages
    }

    // Fetch new data
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    // Update state with new articles
    this.setState(prevState => ({
      articles: [...prevState.articles, ...parsedData.articles],
      page: nextPage,
      totalResults: parsedData.totalResults,
      loading: false
    }));
  };


  // fetchMoreData = async () => {

  //   this.setState({ page: this.state.page + 1 })
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   this.setState({
  //     articles: this.state.articles.concat(parsedData.articles),
  //     totalResults: parsedData.totalResults,
  //     loading: false
  //   })

  // };

  render() {
    return (
      <>
      <div className='root'>
        <br></br>
        <h2 className='text-center my-5' style={{ margin: '20px 0px', marginTop: '90px' }}>NewsDay-Top Headline</h2>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='container'>


            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 60) : ""} discription={element.description ? element.description.slice(0, 100) : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevios}>&larr; previous </button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>next &rarr;</button>
        </div> */}

  
</div>
      </>

    )
  }
}

export default News
