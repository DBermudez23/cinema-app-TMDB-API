import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { API_KEY, API_URL } from "./url";
import MainMovie from "./mainMovie.jsx";
import MediaList from "./MediaList.jsx";
import "../CSS/square.css";

function TvComponent({ selectedTv, setSelectedTv }) {
  const [allResultsTv, setAllResultsTV] = useState([]);
  const [currentPageTv, setCurrentPageTv] = useState(1);
  const tvPerPage = 8;

  //Function to fetch the API, in this case the popular Tv shows, series
  useEffect(() => {
    const fetchPopTvs = async () => {
      try {
        const initialResponse = await axios.get(`${API_URL}/trending/tv/day`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
            page: 1,
          },
        });

        //requirement of 15 pages of 20 elements each (tv)
        const totalPages = 15;
        const resultsTv = initialResponse.data.results;

        const requestsTv = [];
        for (let page = 2; page <= totalPages; page++) {
          requestsTv.push(
            axios.get(`${API_URL}/trending/tv/day`, {
              params: {
                api_key: API_KEY,
                language: "en-US",
                page: page,
              },
            })
          );
        }

        const responsesTv = await Promise.all(requestsTv);
        const allPageResultsTv = responsesTv
          .map((responseTv) => responseTv.data.results)
          .flat();
        const allTvShows = [...resultsTv, ...allPageResultsTv];
        setAllResultsTV(allTvShows);

        //Generate a random Tv for the main component
        const randomTv =
          allTvShows[Math.floor(Math.random() * allTvShows.length)];
        setSelectedTv(randomTv);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchPopTvs();
  }, [setSelectedTv]);

  //generating the pagination
  const indexOfLastTv = currentPageTv * tvPerPage;
  const indexOfFirstTv = indexOfLastTv - tvPerPage;
  const currentTv = allResultsTv.slice(indexOfFirstTv, indexOfLastTv);
  const totalPagesTv = Math.ceil(allResultsTv.length / tvPerPage);

  return (
    <div>
      <div className="main-info-tv">
        {selectedTv ? (
          <MainMovie
            adult={selectedTv.adult}
            title={selectedTv.name}
            overview={selectedTv.overview}
            posterPath={selectedTv.poster_path}
            movieId={selectedTv.id}
          />
        ) : (
          <p>Cargando programa...</p>
        )}
      </div>
      <h2 className="label">Popular TV Series</h2>
      <MediaList
        currentItems={currentTv}
        handleSelect={setSelectedTv}
        nextPage={() => setCurrentPageTv(currentPageTv + 1)}
        prevPage={() => setCurrentPageTv(currentPageTv - 1)}
        currentPage={currentPageTv}
        totalPages={totalPagesTv}
      />
    </div>
  );
}
//specifying types of passed props

TvComponent.propTypes = {
  selectedTv: PropTypes.shape({
    adult: PropTypes.bool,
    name: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
  setSelectedTv: PropTypes.func.isRequired,
};

export default TvComponent;
