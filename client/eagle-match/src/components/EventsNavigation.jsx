import {NavLink, useRouteLoaderData} from 'react-router-dom'

export default function EventsNavigation() {
    const token = useRouteLoaderData('root')

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to='/'>
                        Wydarzenia
                    </NavLink>
                </li>
                {token && (
                    <li>
                        <NavLink to='/create-event'>
                            Stwórz wydarzenie
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    )
}