import { Form } from "react-router-dom";

export default function ChangeProfileForm({user}) {
    return (
        <div>
            <Form method="patch">
                <p>
                    <label htmlFor="role">Rola:</label>
                    <input type="number" id="role" name="role" defaultValue={user.role}/>
                </p>
                <p>
                    <label htmlFor="goals">Gole:</label>
                    <input type="number" id="goals" name="goals" defaultValue={user.goals}/>
                </p>
                <p>
                    <label htmlFor="assists">Asysty:</label>
                    <input type="number" id="assists" name="assists" defaultValue={user.assists}/>
                </p>
                <p>
                    <label htmlFor="clean-sheets">Czyste konta:</label>
                    <input type="number" id="clean-sheets" name="clean-sheets" defaultValue={user.cleanSheets}/>
                </p>
                <div>
                    <button>Zapisz</button>
                </div>
            </Form>
        </div>
    )
}