import PropTypes from "prop-types";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import MovieCard from "./Moviecard";
import "../CSS/movieCard.css";

function MediaList({
  currentItems,
  handleSelect,
  nextPage,
  prevPage,
  currentPage,
  totalPages,
}) {
  return (
    <div className="movies-cont">
      {currentPage > 1 && (
        <button onClick={prevPage} className="button-cont">
          <AiFillCaretLeft className="button-icon" />
        </button>
      )}
      {currentItems.length > 0 && (
        <div className="movies-list">
          {currentItems.map((item) => {
            const {
              adult,
              original_title,
              name,
              overview,
              poster_path,
              profile_path,
            } = item;

            return (
              <div key={uuidv4()} onClick={() => handleSelect(item)}>
                <MovieCard
                  adult={adult}
                  title={original_title}
                  name={name}
                  overview={overview}
                  posterPath={poster_path}
                  profile_path={profile_path}
                />
              </div>
            );
          })}
        </div>
      )}
      {currentPage < totalPages && (
        <button onClick={nextPage} className="button-cont">
          <AiFillCaretRight className="button-icon" />
        </button>
      )}
    </div>
  );
}

MediaList.propTypes = {
  currentItems: PropTypes.array.isRequired,
  handleSelect: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default MediaList;
