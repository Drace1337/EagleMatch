import MessageItem from "../components/MessageItem.jsx";
import { useLoaderData, json, redirect } from "react-router-dom";
import { getAuthToken } from "../util/auth.js";

function MessageDetailPage() {
  const data = useLoaderData();

  return (
    <>
      <MessageItem message={data.message} />
    </>
  );
}

export default MessageDetailPage;

export async function loader({ request, params }) {
    const id = params.messageId;
    
    const response = await fetch("http://localhost:3001/message/" + id, {
        headers: {
        Authorization: "Bearer " + getAuthToken(request),
        },
    });
    if (!response.ok) {
        return json({ message: "Nie udało się załadować wiadomości" }, { status: 500 });
    } else {
        return response;
    }
}