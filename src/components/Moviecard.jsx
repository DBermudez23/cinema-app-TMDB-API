import PropTypes from "prop-types";
import "../CSS/movieCard.css";

function MovieCard({ title, name, posterPath, profile_path }) {
  //Movie need title, Tv and person needs name
  const displayTitle = title || name;
  //Movie and Tv needs posterPath, Person need profile_path
  const imageUrl = profile_path
    ? `https://image.tmdb.org/t/p/w500${profile_path}`
    : posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : null;
  return (
    <div className="movie-card">
      <h3 className="title">{displayTitle}</h3>
      {imageUrl && <img src={imageUrl} alt={displayTitle} />}
    </div>
  );
}

MovieCard.propTypes = {
  adult: PropTypes.bool.isRequired,
  title: PropTypes.string,
  name: PropTypes.string,
  overview: PropTypes.string.isRequired,
  posterPath: PropTypes.string,
  profilePath: PropTypes.string,
};

export default MovieCard;
