import { useState, createContext, useContext } from "react"
import { createPostRequests, getPostsRequests } from "../api/posts"
import { useEffect } from "react"
const postContext = createContext()

export const usePosts = () => {
    const context = useContext(postContext)
    return context
}

export const PostProvider = ({ children }) => {

    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        const res = await getPostsRequests()
        setPosts(res.data)
    }

    const createPost = async (post) => {
        const res = await createPostRequests(post)
        setPosts([...posts, res.data])

    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <postContext.Provider value={{
            posts,
            getPosts,
            createPost

        }}>
            {children}
        </postContext.Provider>
    )
}