import TeamItem from "../components/TeamItem.jsx";
import { useLoaderData, json, redirect } from "react-router-dom";
import { getAuthToken } from "../util/auth.js";

function TeamDetailPage() {
    const data = useLoaderData();
    
    return (
        <>
            <TeamItem team={data.team} />
        </>
    );
}

export default TeamDetailPage;

export async function loader({ request, params }) {
    const id = params.teamId;
    
    const response = await fetch("http://localhost:3001/team/team/" + id, {
        headers: {
        'Authorization': "Bearer " + getAuthToken(request),
        },
    });
    if (!response.ok) {
        return json({ message: "Nie udało się załadować drużyny" }, { status: 500 });
    } else {
        return response;
    }
}

export async function action({ request, params }) {
    const id = params.teamId;
    
    const response = await fetch("http://localhost:3001/team/team/" + id, {
        method: "DELETE",
        headers: {
        'Authorization': "Bearer " + getAuthToken(request),
        },
    });
    if (!response.ok) {
        return json({ message: "Nie udało się usunąć drużyny" }, { status: 500 });
    } else {
        return redirect("/");
    }
}