import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import classes from './Profile.module.scss'

export default function ProfileStruct({ user }) {
	// console.log(user._id)
	const imgPath = `http://localhost:3001/${user.avatar}`
	return (
		<>
			<h2>Witaj {user.name}!</h2>
			<div className={classes.profile}>
				<div className={classes.profile__avatar}>
					<img src={imgPath} alt='avatar' />
				</div>
				<div className={classes.profile__content}>
					<div className={classes.profile__content__text}>
						<p>Twój email: {user.email}</p>

						<p>Twój zespół: {user.team && <Link to={`/team/${user.team._id}`}>{user.team.name}</Link>}</p>
						<p>Twoje bramki: {user.goals}</p>
						<p>Twoje asysty: {user.assists}</p>
						<p>Twoje czyste konta: {user.cleanSheets}</p>
					</div>
					<div className={classes.profile__content__link}>
						<Link to='edit-profile'>Edytuj profil</Link>
						<Link to='change-password'>Zmień hasło</Link>
					</div>
				</div>
			</div>
			<div className={classes.events}>
				<h2>Twoje wydarzenia: </h2>
				<ul className={classes.events__list}>
					{user.events.map(event => (
						<li key={event._id} className={classes.events__list__item}>
							<Link to={`/event/${event._id}`}>
								<div className={classes.events__list__item__content}>
									<h3>{event.title}</h3>
									<time>{new Date(event.date).toLocaleDateString()}</time>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}
