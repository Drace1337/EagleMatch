import {useRouteLoaderData} from 'react-router-dom';
import TeamForm from "../components/TeamForm";

export default function EditTeam() {

    const data = useRouteLoaderData('team-detail');
    return(
        <>
            <TeamForm method='put' team={data.team}/>
        </>
    )
}