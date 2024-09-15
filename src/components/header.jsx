//icon menu for the responsive
import { AiOutlineSearch } from "react-icons/ai";
//Menu responsive
import DropdownMenu from "./Menu";
import "../CSS/Header.css";
//CustomNavLink to navegate (movies, tv series, person)
import { CustomNavLink } from "../Routes/customNavLink";
//Def of propTypes
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

function Header({ setSearchKey, searchMovies, searchTv, searchPerson }) {
  const location = useLocation(); // Get the actual path

  const handleSubmit = (e) => {
    e.preventDefault();
    //we generate a conditional to pass the search functions to each component
    if (location.pathname === "/tv") {
      searchTv(e);
    } else if (location.pathname === "/person") {
      searchPerson(e);
    } else {
      searchMovies(e);
    }
  };
  //Generate the header component
  return (
    <header className="header">
      <Link to="/" className="app-name">
        <h1>Movies DB</h1>
      </Link>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search (Movie, TV series, Person)"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch />
        </button>
      </form>
      <div className="info-container">
        <div className="navegate">
          <ul className="navegate-ul">
            <li className="navegate-li">
              <CustomNavLink to="/">Movies</CustomNavLink>
            </li>
            <li className="navegate-li">
              <CustomNavLink to="/tv">TV series</CustomNavLink>
            </li>
            <li className="navegate-li">
              <CustomNavLink to="/person">Person</CustomNavLink>
            </li>
          </ul>
        </div>
        <DropdownMenu />
      </div>
    </header>
  );
}

Header.propTypes = {
  setSearchKey: PropTypes.func.isRequired,
  searchMovies: PropTypes.func.isRequired,
  searchTv: PropTypes.func.isRequired,
};

export default Header;
