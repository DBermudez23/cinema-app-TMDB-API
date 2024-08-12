import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import "../CSS/person.css";

//component that will show, if they exist, the works for which the person has been mainly recognized
function KnownFor({ knownForItems }) {
  return (
    <div className="known-for">
      {knownForItems.map((item) => (
        <div key={uuidv4} className="known-for-item">
          <h4>{item.title || item.original_title}</h4>
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.title || item.original_title}
          />
        </div>
      ))}
    </div>
  );
}

KnownFor.propTypes = {
  knownForItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      title: PropTypes.string,
      original_title: PropTypes.string,
      overview: PropTypes.string,
    })
  ).isRequired,
};

export default KnownFor;
