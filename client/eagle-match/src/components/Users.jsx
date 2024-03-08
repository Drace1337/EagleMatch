export default function Users({ users }) {
    return (
        <table>
            <thead>
                <th>Użytkownicy:</th>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}