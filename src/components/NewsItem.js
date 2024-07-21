import React, { Component } from 'react';
import "../css/style.css";

export class NewsItem extends Component {

  render() {
    let { title, discription, imageUrl, newsUrl, author, date, source } = this.props; // destructuring
    return (
      <div className="">
        <div className="card" >
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0'
          }
          }>
            <span className="badge rounded-pill bg-info"> {source} </span>
          </div>
          <img className="card-img-top" src={imageUrl ? imageUrl : "https://img.etimg.com/thumb/msid-109685743,width-1200,height-630,imgsize-2647412,overlay-etmarkets/photo.jpg"} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{title}...

            </h5>
            <p className="card-text">{discription}...</p>
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noopener" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
