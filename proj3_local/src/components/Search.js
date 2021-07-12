import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import axios from 'axios';
import { SearchMovie } from './SearchMovie';
import "./Search.css";
import { DetailMovieInfo } from './DetailMovieInfo';

function Search(props) {
  const [state, setState] = useState({
    isLoading: false,
    value: "",
    oneMovie: [],
    subMoives: [],
    imgURL: [],
  });
  const [movie, setMovie] = useState({});
  const [sort, setSort] = useState("");
  const [limit, setLimit] = useState("");
  const [movies, setMovies] = useState([]);
  const [detailInfo, setDetailInfo] = useState([]);

  const getSearchMovie = async (e) => {
    console.log('search Movie');

    try {
      if (e === "") {
        setState({...state, isLoading: false})
        setMovies("")
      } else {
        setState({...state, isLoading: true})
        let result = await axios.get(`https://movie-app-2021.herokuapp.com/yts/api/v2/list_movies.json?sort_by=${sort}_count&order_by=desc&limit=${limit}`)
        result = result.data.data.movies;
        console.log(result);
        for(let i = 0; i <result.length; i++) {
          let t = `<img src='https://movie-app-2021.herokuapp.com/yts/${result[i].medium_cover_image.match(/assets.*/)}' alt='yts movie snapshot'>`;
          state.imgURL[i] = t;
          movies[i] = result[i];
          let getLike =  await axios.get(`https://movie-app-2021.herokuapp.com/yts/api/v2/movie_details.json?movie_id=${result[i].id}&with_images=true&with_cast=true`)
          movies[i].like_count = getLike.data.data.movie.like_count;
          console.log(movies[i].large_cover_image)
        }
        console.log(movies);
        setState({...state, isLoading : false})
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMovieDetail = ($target) => {
    setState({...state, oneMovie:[state.subMovies[$target]]})
  }

  const componentDidMount = () => {
    getSearchMovie();
  };

  const handleChange = (e : any) => {
    const inputStr = e.target.value.split(' ');
    setSort(inputStr[0]);
    setLimit(inputStr[1]);
    setState({...state, oneMovie: [], value: e.target.value});
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    getSearchMovie(e);
  };

  const handleImgClick = (e : any) => {
    const $target = e.target.value;
    getMovieDetail($target);
  }

  const imgClicked = (value) => {
    setDetailInfo([value]);
  }

  const {subMoives, isLoading, name} = state;

    return (<section className="container">
      {
        isLoading
          ? (<div className="loader">
            <span className="loader__text">Loading... {state.value}</span>
          </div>)
          : (<form onSubmit={handleSubmit}>
            <div className="search-box">
              <div className="app-title">yts.mx 영화 정보</div>
              <div className="input_div">
                <input className="input_search" type="text" value={state.value} onChange={handleChange} placeholder="입력포맷:<정렬기분> <검색개수> 예:like 5"/>
                <button type="submit">
                    <MdAdd />
                </button>
              </div>
              <div className="images">
                  {movies.map((movie, index) => (<SearchMovie key={index} value={index} like_count={movie.like_count} poster={movie.medium_cover_image} rating={movie.rating} id={movie.id} title={movie.title} description_full={movie.description_full} runtime={movie.runtime} genres={movie.genres} onClick={imgClicked}/>))}
              </div>
              <div className="movies">
                {detailInfo.map((movie) => (<DetailMovieInfo like_count={movie.like_count} poster={movie.poster} rating={movie.rating} id={movie.id} title={movie.title} description_full={movie.description_full} runtime={movie.runtime} genres={movie.genres}/>))}
              </div>
            </div>
          </form>)
      }
    </section>);
  }

export default Search;