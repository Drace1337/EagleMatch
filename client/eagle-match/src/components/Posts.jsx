import {  Link,  } from 'react-router-dom'
import classes from './Posts.module.scss'

export default function Posts({ posts }) {
	return (
		<div className={classes.posts}>
			<ul className={classes.posts__list}>
				{posts.map(post => (
					<li key={post._id} className={classes.posts__list__item}>
						<div className={classes.posts__list__item__text}>
							<p>Temat: {post.title}</p>
						</div>
						<div className={classes.posts__list__item__link}>
							<Link to={`/post/${post._id}`}>Zobacz post</Link>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
