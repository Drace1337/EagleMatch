import logoImg from '../logo.svg'

export default function Header() {
	return (
		<header id='main-header' className='main-header'>
			<div className='title' id='title'>
				<img src={logoImg} alt='Eagle Match' />
				<h1>Eagle Match</h1>
			</div>
		</header>
	)
}
