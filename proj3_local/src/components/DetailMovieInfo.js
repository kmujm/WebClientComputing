import React, {useState} from "react";
import PropTypes from "prop-types";
import './DetailMovieInfo.css';
import Search from "./Search";

export function DetailMovieInfo(props) {
    const [state, setState] = useState({
        poster: props.poster,
        rating: props.rating,
        title: props.title,
        description_full: props.description_full,
        runtime: props.runtime,
        genres: props.genres,
        like_count: props.like_count
    });

    return(       
        <div className="movie__data">
          <img className="movie_img" src={props.poster} alt={props.title} titlt={props.title}></img>
          <h3 className="movie__title">{
              props.title.replace(/<b>/gi,"").replace(/<\/b>/gi,"")
            }</h3>
          <p className="movie__genre">
            {props.genres.map((genre, index) => (<span key={index}>{genre}{", "}</span>))}
          </p>
          <p className="movie_info"> 
            <h3>영화 정보</h3>
            <span>{props.runtime}분</span>
            <span>평점 : {props.rating}</span>
            <span>좋아요 : {props.like_count}</span>
          </p>
          <p className="movie_description">
            <h3>줄거리</h3>
            <span>{props.description_full}</span>
          </p>

      </div>
    )
}

DetailMovieInfo.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    runtime: PropTypes.string.isRequired,
    like_count: PropTypes.string.isRequired,
    genres:  PropTypes.string.isRequired
  };

export default DetailMovieInfo;