import { NavLink, useRouteLoaderData } from 'react-router-dom';

export default function ForumNavigation() {

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to='/forum'>
                        Forum
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/create-post'>
                        Stwórz post
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}