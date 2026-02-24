function MovieCard({ movie, onSelect }) {
  return (
    <div class="movie-card"
    onClick = {() =>onSelect(movie.imdbID)}
    >
      <img
        src={movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/200"}
        alt={movie.Title}
        width="180"
        style={{ borderRadius: "8px" }}
      />

      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </div>
  );
}

export default MovieCard;
