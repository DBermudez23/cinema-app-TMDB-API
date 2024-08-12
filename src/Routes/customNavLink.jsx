import { NavLink as NavLinkReactRouter } from "react-router-dom";
import "../CSS/square.css";

export const CustomNavLink = ({ to, children, ...props }) => {
  return (
    <NavLinkReactRouter
      {...props}
      className={({ isActive }) => {
        return isActive ? "is-active" : undefined;
      }}
      to={to}
    >
      {children}
    </NavLinkReactRouter>
  );
};
