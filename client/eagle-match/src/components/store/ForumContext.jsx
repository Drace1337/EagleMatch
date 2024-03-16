import { createContext } from 'react'
import { useState } from 'react'

const ForumContext = createContext({
	creation: false,
	createPost: () => {},
	cancelCreation: () => {},
})

export function ForumProvider({ children }) {
	const [creation, setCreation] = useState(false)

	function createPost() {
		setCreation(true)
	}

	function cancelCreation() {
		setCreation(false)
	}

	const forumCtx = {
		creation: creation,
		createPost,
		cancelCreation,
	}

	return <ForumContext.Provider value={forumCtx}>{children}</ForumContext.Provider>
}

export default ForumContext
