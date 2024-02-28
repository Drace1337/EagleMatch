import logoImg from '../assets/logo.png';

export default function Header() {
    return (
        <header>
            <img src={logoImg} alt="Eagle Match" />
            <h1>Eagle Match</h1>
        </header>
    )
}