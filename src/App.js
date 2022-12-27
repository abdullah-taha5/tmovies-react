import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";
import Movie from "./Components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=2";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputSearchRef  = useRef();
  useEffect(() => {
    const getData = async () => {
      let { data } = await axios.get(FEATURED_API);
      setMovies(data.results);
    };
  inputSearchRef.current.focus();

    getData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      let { data } = await axios.get(`${SEARCH_API}${searchTerm}`);
      setMovies(data.results);
      setSearchTerm("");
    }
  };
  const handleChange = async (e) => {
    setSearchTerm(e.target.value);
    let { data } = await axios.get(`${SEARCH_API}${searchTerm}`);
    setMovies(data.results);
  };

  return (
    <Fragment>
      <header>
        <h2><span style={{color: "gold"}}>t</span>movies</h2>
      </header>
      <form onSubmit={handleSubmit}>
      <input
        type="search"
        className="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        ref={inputSearchRef}
      />
    </form>
      <div className="movie-container">
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
      <footer>© ALL RIGHTS RESERVED TO ABDULLAH TAHA</footer>
    </Fragment>
  );
}

export default App;
