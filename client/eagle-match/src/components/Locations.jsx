export default function Locations({ locations }) {
    return (
        <table>
            <thead>
                <th>Boiska:</th>
            </thead>
            <tbody>
                {locations.map((location) => (
                    <tr key={location.id}>
                        <td>{location.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )}