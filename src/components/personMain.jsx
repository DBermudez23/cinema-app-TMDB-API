import KnownFor from "./knownP";
import PropTypes from "prop-types";
import "../CSS/person.css";

function PersonMain({
  name,
  known_for_department,
  profile_path,
  known_for,
  popularity,
}) {
  return (
    <div className="person-container">
      <div className="img-container">
        <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} />
      </div>
      <div className="info-person-container">
        <h2>{name}</h2>
        <small>Popularity: {popularity}</small>
        <h3 className="department">Department: {known_for_department}</h3>
        <h3>Known for: </h3>
        {/*Component of Known for */}
        {known_for && known_for.length > 0 ? (
          <KnownFor knownForItems={known_for} />
        ) : (
          <p>No known works available</p>
        )}
      </div>
    </div>
  );
}

PersonMain.propTypes = {
  name: PropTypes.string.isRequired,
  known_for_department: PropTypes.string.isRequired,
  profile_path: PropTypes.string,
  known_for: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      original_title: PropTypes.string,
      overview: PropTypes.string,
      poster_path: PropTypes.string,
      media_type: PropTypes.string,
      popularity: PropTypes.number,
      release_date: PropTypes.string,
    })
  ).isRequired,
  popularity: PropTypes.number.isRequired,
};

export default PersonMain;
