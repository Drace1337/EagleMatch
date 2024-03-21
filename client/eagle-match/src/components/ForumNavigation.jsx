import { NavLink } from 'react-router-dom';
import classes from './SubNav.module.scss';

export default function ForumNavigation() {

    return (
        <nav className={classes.nav}>
            <ul className={classes.nav__list}>
                <li>
                    <NavLink to='create-post'>
                        Stwórz post
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}