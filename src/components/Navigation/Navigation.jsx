import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Navigation.module.css";

const linkNav = ({ isActive }) => {
    return clsx(s.navLink, isActive && s.navActive);
};

const Navigation = ({ user }) => {
    return (
        <nav className={s.nav}>
            <NavLink to="/" className={linkNav}>
                Home
            </NavLink>
            <NavLink to="/nannies" className={linkNav}>
                Nannies
            </NavLink>
            {user && (
                <NavLink to="/favorites" className={linkNav}>
                    Favorites
                </NavLink>
            )}
        </nav>
    );
};

export default Navigation;