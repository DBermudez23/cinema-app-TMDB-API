import { useState } from "react";
import "../CSS/Header.css";
import { AiOutlineMenu } from "react-icons/ai";
import { CustomNavLink } from "../Routes/customNavLink";

const DropdownMenu = () => {
  //For dropdown function
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //Dropdown for responsive design

  return (
    <div className="dropdown">
      <button onClick={toggleMenu} className="dropdown-button">
        <AiOutlineMenu className="menu-icon" />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li className="navegate-li">
            <CustomNavLink to="/">Movies</CustomNavLink>
          </li>
          <li className="navegate-li">
            <CustomNavLink to="/tv">TV </CustomNavLink>
          </li>
          <li className="navegate-li">
            <CustomNavLink to="/person">Person</CustomNavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
