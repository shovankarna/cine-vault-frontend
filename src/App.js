import { Route, Routes } from 'react-router-dom';
import './App.css';
import api from './api/axiosConfig.js';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';

function App() {

  const [movie, setMovie] = useState();
  const [allMovies, setAllMovies] = useState();
  const [reviews, setReviews] = useState([]);

  const getAllMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies/getallmovies")
      setAllMovies(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("ERROR in getMovies: ", error);
    }
  }

  const getMovieDataById = async (movieId) => {

    try {
      const response = await api.get(`/api/v1/movies/getmovie/${movieId}`);

      const singleMovie = response.data;
      setMovie(singleMovie);
      console.log(singleMovie);
      setReviews(singleMovie.reviewIds);
    }
    catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    getAllMovies();
  }, [])


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={allMovies} />} ></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieDataById} movie={movie} reviews={reviews} setReviews={setReviews} />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </div >
  );
}

export default App;
