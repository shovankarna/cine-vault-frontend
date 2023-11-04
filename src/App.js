import { Route, Routes } from 'react-router-dom';
import './App.css';
import api from './api/axiosConfig.js';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/home/Home';

function App() {

  const [movies, setMovies] = useState();

  const getAllMovies = async () => {

    try {
      const response = await api.get("/api/v1/movies/getallmovies")
      setMovies(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("ERROR in getMovies: ", error);
    }
  }

  useEffect(() => {
    getAllMovies();
  }, [])


  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/' element={<Home movies={movies} />}>

          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
