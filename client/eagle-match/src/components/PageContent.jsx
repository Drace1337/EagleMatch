function PageContent({ title, children }) {
	return (
		// <div className={classes.content}>
		<div>
			<h1>{title}</h1>
			{children}
		</div>
	)
}

export default PageContent