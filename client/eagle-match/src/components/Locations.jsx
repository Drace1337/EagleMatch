export default function Locations({ locations }) {
    return (
        // <table>
        //     <thead>
        //         <th>Boiska:</th>
        //     </thead>
        //     <tbody>
        //         {locations.map((location) => (
        //             <tr key={location.id}>
        //                 <td>{location.name}</td>
        //             </tr>
        //         ))}
        //     </tbody>
        // </table>
        <div>
            <h2>Boiska:</h2>
            <ul>
                {locations.map((location) => (
                    <li key={location.id}>
                        <div>
                            <h3>{location.name}</h3>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )}