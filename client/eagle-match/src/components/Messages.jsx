import {Link} from "react-router-dom";

export default function Messages({messages}) {
    return (
        <div>
        <h2>Messages</h2>
        <ul>
            {messages.map((message) => (
                <li key={message.id}>
                    <Link to={message.id}>{message.topic}</Link>
                </li>
            ))}
        </ul>
        </div>
    );
}