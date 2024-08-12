import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { API_KEY, API_URL } from "./url";
import MainMovie from "./mainMovie.jsx";
import MediaList from "./MediaList.jsx";
import "../CSS/square.css";

function MoviesComp({ selectedMovie, setSelectedMovie }) {
  const [allResults, setAllResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;

  useEffect(() => {
    //Function to fetch the API, in this case the popular movies
    const fetchPopMovies = async () => {
      try {
        const initialResponse = await axios.get(`${API_URL}/movie/popular`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
            page: 1,
          },
        });

        const totalPages = 15;
        const results = initialResponse.data.results;
        //requirement of 15 pages of 20 elements each (movies)
        const requests = [];
        for (let page = 2; page <= totalPages; page++) {
          requests.push(
            axios.get(`${API_URL}/movie/popular`, {
              params: {
                api_key: API_KEY,
                language: "en-US",
                page: page,
              },
            })
          );
        }

        const responses = await Promise.all(requests);
        const allPageResults = responses
          .map((response) => response.data.results)
          .flat();
        const allMovies = [...results, ...allPageResults];
        setAllResults(allMovies);

        //Generate a random movie for the main component
        const randomMovie =
          allMovies[Math.floor(Math.random() * allMovies.length)];
        setSelectedMovie(randomMovie);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchPopMovies();
  }, []);

  //generating the pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = allResults.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPagesMovies = Math.ceil(allResults.length / moviesPerPage);

  return (
    <div>
      <div className="main-info">
        {selectedMovie ? (
          <MainMovie
            adult={selectedMovie.adult}
            title={selectedMovie.original_title}
            overview={selectedMovie.overview}
            posterPath={selectedMovie.poster_path}
            movieId={selectedMovie.id}
          />
        ) : (
          <p>Cargando película...</p>
        )}
      </div>
      <h2 className="label">Popular Movies</h2>
      <MediaList
        currentItems={currentMovies}
        handleSelect={setSelectedMovie}
        nextPage={() => setCurrentPage(currentPage + 1)}
        prevPage={() => setCurrentPage(currentPage - 1)}
        currentPage={currentPage}
        totalPages={totalPagesMovies}
      />
    </div>
  );
}
//specifying types of passed props
MoviesComp.propTypes = {
  selectedMovie: PropTypes.shape({
    adult: PropTypes.bool,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
  setSelectedMovie: PropTypes.func.isRequired,
};

export default MoviesComp;
