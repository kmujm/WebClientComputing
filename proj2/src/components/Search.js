import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Movie } from './Movie';
import "./Search.css";
import {naverMoviesApi} from '../api';

function Search() {
  const [state, setState] = useState({
    isLoading: false,
    movies: [],
    movieSub: [],
    value: "",
    name: "영화 검색"
  });

  const getSearchMovie = async () => {
    console.log('search Movie');
    const search = state.value;

    try {
      if (search === "") {
        setState({...state, movies: [], isLoading: false})
      } else {
        setState({...state, movies: [], isLoading: true})
        const {data: {
            items
          }} = await naverMoviesApi.search(search);
        //alert("(Loading 메시지 확인중...)");
        setState({...state, movies: items, isLoading: false});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const componentDidMount = () => {
    getSearchMovie();
  };

  const handleChange = (e : any) => {
    setState({...state, movieSub: [], value: e.target.value});
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    getSearchMovie();
  };

  const buttonClicked = (e) => {
    const index = e.target.value
    let movie = state.movies[index] 
    setState({...state, movieSub : [movie]})
     
  };

  const {movies, isLoading, name} = state;

    return (<section className="container">
      {
        isLoading
          ? (<div className="loader">
            <span className="loader__text">({state.name}) Loading... {state.value}</span>
          </div>)
          : (<form onSubmit={handleSubmit}>
            <div className="search-box">
              <div className="app-title">영화 검색 서비스</div>
              <div className="input_div">
                <input className="input_search" type="text" value={state.value} onChange={handleChange} placeholder="영화를 검색해 보세요."/>
                <button type="submit">
                    <MdAdd />
                </button>
              </div>
              <div className="buttons">
                  {movies.map((moive, index) => (<button className = "button" value = {index} key = {index} index = {index} onClick = {buttonClicked}> {index + 1}</button>))}
              </div>
              <div className="movies">
                {state.movieSub.map((movie) => (<Movie key={movie.link} id={movie.link} year={movie.pubDate} title={movie.title} poster={movie.image} rating={movie.userRating} director={movie.director} actor={movie.actor}/>))}

              </div>
            </div>
          </form>)
      }
    </section>);
  }

export default Search;