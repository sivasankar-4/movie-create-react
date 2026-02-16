function MovieCard({movie,addFavorite }){
    return (
        <div style={{

            border:"1px solid gray",
            padding:"10px",
            margin:"10px",
            width:"200px",
            borderRadius: "8px"

        }}>
         <img
      src={
       movie.Poster !== "N/A"
         ? movie.Poster
          : "https://via.placeholder.com/150"
  }
  alt={movie.Title}
  width="150"
/>

          <h3>{movie.Title}</h3>
          <p>{movie.year}</p>
          <p>Type:{movie.Type}</p>

          <button onClick={() => addFavorite(movie)}>❤️ Favorite</button>
        </div>
    );
}

export default MovieCard;