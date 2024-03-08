export default function PasswordForm() {
   return (
    <div>
        <Form method='put'>
            <p>
            <label htmlFor="oldpassword">Stare hasło:</label>
            <input type="password" id="oldpassword" name="oldpassword" required />
            </p>
            <p>
            <label htmlFor="newpassword">Nowe hasło:</label>
            <input type="password" id="newpassword" name="newpassword" required />
            </p>
            <p>
            <label htmlFor="confirmnewpassword">Potwierdź hasło:</label>
            <input type="password" id="confirmnewpassword" name="confirmnewpassword" required />
            </p>
            <div>
            <button type='submit'>Zmień hasło</button>
            </div>
        </Form>
    </div>
   )
}