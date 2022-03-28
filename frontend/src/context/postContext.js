import { useState, createContext, useContext } from "react"
import { createPostRequests, deletePostRequest, getPostRequests, getPostsRequests, updatePostRequests } from "../api/posts"
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
        try{
            const res = await createPostRequests(post)
            setPosts([...posts, res.data])
        }catch(err){
            console.log(err)
        }
        

    }

    const deletePost = async(id)=>{

        await deletePostRequest(id)

        setPosts(posts.filter((post)=> post._id !== id))

    }

    const getPost = async (id)=>{
        
        const res = await getPostRequests(id)
        return res.data
    }

    const updatePost = async(id, post)=>{

        const res = await updatePostRequests(id, post)

        setPosts(posts.map((post) => post._id === id ? res.data : post))

        return res

    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <postContext.Provider value={{
            posts,
            getPosts,
            createPost,
            deletePost,
            getPost,
            updatePost

        }}>
            {children}
        </postContext.Provider>
    )
}