import "./App.css";
import { useState } from "react";
import MovieCard from "./components/MovieCard";
function App() {
  const [movie, setMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites,setFavorites] = useState([]);
  const [selectedMovie,setSelectedMovie] = useState(null);
  function handleChange(e) {
    setMovie(e.target.value);
  }
  function addFavorite(movie) {
    setFavorites((prev)=>[...prev,movie]);
  }
  async function searchMovie() {
    if (!movie.trim()) return; // prevent empty search

    setLoading(true);
    setSelectedMovie(null);  //close previous details here
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${movie}&apikey=5bf3b846`
      );
      const data = await response.json();
   
     
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    }catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
  }

     setLoading(false);
  }
  async function getMovieDetails(id) {
    console.log("Clicked:", id);
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=5bf3b846`
    );
    const data = await response.json();
    setSelectedMovie(data);
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div class="app">
      <h1 class="title">Find your Movies</h1>
      <div class="search-container">
    <input class="search-input"
  type="text"
  placeholder="Search movies..."
  value={movie}
  onChange={handleChange}
  onKeyDown={(e) => e.key === "Enter" && searchMovie()}
/>

      <button class="search-button" onClick={searchMovie}> Search</button>

      {loading && <p>Loading movies...</p>}

      {!loading && movies.length === 0 && movie && (
        <p>No movies found 😢</p>
      )}
      </div>
  <div
>
  </div>
  <div class="movie-grid">
  {movies.map((m) => (
    <MovieCard key={m.imdbID} movie={m} onSelect = {getMovieDetails}/>
  ))}
</div>

{selectedMovie && (
  <div class="modal-overlay" onClick={() =>setSelectedMovie(null)}>
    <div class="modal-content"  onClick={(e) => e.stopPropagation()}>
      <h2>{selectedMovie.Title}</h2>
      <p><strong>Year:</strong> {selectedMovie.Year}</p>
      <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
      <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
      <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
      <p><strong>IMDb Rating:</strong> {selectedMovie.imdbRating}</p>

      <button class="close-button"
        onClick={() => setSelectedMovie(null)}
      >
        Close
      </button>
    </div>
  </div>
 
)}
</div>
);
}
export default App;
