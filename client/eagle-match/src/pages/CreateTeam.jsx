import TeamForm from "../components/TeamForm.jsx";
import {json, redirect} from "react-router-dom";

export default function CreateTeam() {
    return (
        <>
            <TeamForm method='post'/>
        </>
    )
}

