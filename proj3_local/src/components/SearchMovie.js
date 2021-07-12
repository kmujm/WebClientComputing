import React, {useState} from "react";
import PropTypes from "prop-types";
import './SearchMovie.css';
import Search from "./Search";

export function SearchMovie(props) {
    const [state, setState] = useState({
        poster: props.poster,
        rating: props.rating,
        title: props.title,
        description_full: props.description_full,
        runtime: props.runtime,
        genres: props.genres,
        like_count: props.like_count
    });

    const handleImgClick = (e : any) => {
        props.onClick(state);

    }
    return(
        <span className="image" onClick={handleImgClick}>
            <a href="#">
                <img src={props.poster} alt={props.title} title={props.title}></img>
            </a>
        </span>
    )
}

SearchMovie.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired  
  };

export default SearchMovie;