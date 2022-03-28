import axios from 'axios'

export const getPostsRequests = async () => {
    return await axios.get('/posts')
}

export const createPostRequests = async (post) => {
    return await axios.post('/posts', post)
}