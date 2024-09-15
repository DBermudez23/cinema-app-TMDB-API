import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import YouTube from "react-youtube";
import axios from "axios";
import { API_KEY, API_URL } from "./url";
import "../CSS/mainMovie.css";

function MainMovie({ adult, title, overview, posterPath, movieId }) {
  const [trailerKey, setTrailerKey] = useState(null);

  //Fetch of movie-Tv trailers
  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(`${API_URL}/movie/${movieId}/videos`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
          },
        });
        //This filter function will take the JSON response from the API and will only take the objects that have the properties that their type is Trailer, and their video site is Youtube, since we can obtain multiple props such as type Clip or another video player
        const trailers = response.data.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        //If more than one response has the type property with a trailer value, it will take the first one and modify the state where the trailer will be stored.
        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        } else {
          setTrailerKey(null); // Without trailer
        }
      } catch (error) {
        console.error("Error fetching trailer: ", error);
        setTrailerKey(null); // Error catch
      }
    };

    if (movieId) {
      fetchTrailer();
    }
  }, [movieId]);

  return (
    <div className="main-movie">
      <div className="info-main">
        <h2>{title}</h2>
        {posterPath && (
          <img
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt={title}
          />
        )}
      </div>
      <div className="info-cont">
        <div className="clasif">
          <p>{adult ? "18+" : "All ages"}</p>
        </div>
        <p className="overview-main">{overview}</p>
        {trailerKey && (
          <YouTube videoId={trailerKey} className="trailer-player" />
        )}
      </div>
    </div>
  );
}

MainMovie.propTypes = {
  adult: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  posterPath: PropTypes.string,
  movieId: PropTypes.number.isRequired,
};

export default MainMovie;
