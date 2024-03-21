// import logoImg from '../logo.svg'
import classes from './Header.module.scss'

function Header() {
	return (
		<header>
			<div className={classes.hero} id='title'>
				<div className={classes.hero__text}>
					<h1>Eagle Match</h1>
				</div>
				<div className={classes.hero__bg}></div>
			</div>
		</header>
	)
}

export default Header
