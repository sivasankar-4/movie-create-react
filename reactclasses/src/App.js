import { useState } from "react";
import MovieCard from "./components/MovieCard";
function App() {
  const [movie, setMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites,setFavorites] = useState([]);

  function handleChange(e) {
    setMovie(e.target.value);
  }
  function addFavorite(movie) {
    setFavorites((prev)=>[...prev,movie]);
  }
  async function searchMovie() {
    if (!movie.trim()) return; // prevent empty search

    setLoading(true);

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
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }

    setLoading(false);
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Movie Search App</h1>

      <input
        type="text"
        placeholder="Enter Movie Name"
        value={movie}
        onChange={handleChange}
        onKeyDown={(e)=>{
          if(e.key === "Enter") {
            searchMovie();
          }
        }}
      />

      <button onClick={searchMovie} style={{ marginLeft: "10px" }}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      {!loading && movies.length === 0 && movie && (
        <p>No movies found</p>
      )}
    <div style={{display: "flex", flexWrap: "wrap",justifyContent:"center"}}>
  {movies.map((m) => (
    <MovieCard key={m.imdbID} movie={m} addFavorite={addFavorite}/>
  ))}
</div>
</div>
);
}
export default App;
