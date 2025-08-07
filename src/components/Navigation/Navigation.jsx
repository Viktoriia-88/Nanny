import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Navigation.module.css";

const buildLinkClass = ({ isActive }) => {
    return clsx(s.navLink, isActive && s.navActive);
};

const Navigation = ({ user }) => {
    return (
        <nav className={s.nav}>
            <NavLink to="/" className={buildLinkClass}>
                Home
            </NavLink>
            <NavLink to="/nannies" className={buildLinkClass}>
                Nannies
            </NavLink>
            {user && (
                <NavLink to="/favorites" className={buildLinkClass}>
                    Favorites
                </NavLink>
            )}
        </nav>
    );
};

export default Navigation;