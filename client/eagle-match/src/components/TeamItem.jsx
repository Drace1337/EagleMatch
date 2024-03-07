export default function TeamItem({ team }) {
    return (
        <article>
        <h2>{team.name}</h2>
        <img src={team.logo} alt='Logo zespołu'/>
        <p>Kapitan: {team.captain}</p>
        <table>
            <thead>
                <th>Gracze zespołu:</th>
            </thead>
            <tbody>
                {team.members.map((member) => {
                        <tr>
                            <td>{member}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
        <h3>Wydarzenia:</h3>
        <ul>
            {team.events.map((event) => {
                    <li>{event}</li>
                })
            }
        </ul>
        <p>Punkty: {team.points}</p>
        <Link to='users' >Dodaj użytkownika</Link>
        <button>Usuń drużynę</button>
        <button>Zaktualizuj dane</button>
        </article>
    );
}