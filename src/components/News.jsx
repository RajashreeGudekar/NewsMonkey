import React, { Component,useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
    static defaultProps = {
        country : 'in',
        pageSize: 6,
        category: "general"
    }

    static propTypes = {
        country : PropTypes.string ,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }


    constructor() {
        super();
        console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        };
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dc797a8fceeb4245bfe814d49eb45715&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.articles,
            totalResult:parsedData.totalResults,
            loading: false
         });
    }

    handlePrevClick = async () => {
        console.log("prev");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dc797a8fceeb4245bfe814d49eb45715&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        });
    }

    handleNextClick = async () => {
        console.log("next");
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResult/this.props.pageSize))){

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dc797a8fceeb4245bfe814d49eb45715&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
       
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        });
       
    }
  }
//   if(!isLoading){
//     render(){
//         return <><Spinner/></>
//     }
//   }
    render() {
        return (
            <div className='container my-3'>
              <h1 className="text-center" style={{margin:'35px 0px'}}>NewsMonkey - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title : ""}
                                    description={element.description ? element.description : ""}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        );
    }
}

export default News;
