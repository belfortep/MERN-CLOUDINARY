import axios from 'axios'

export const getPostsRequests = async () => {
    return await axios.get('/posts')
}

export const createPostRequests = async (post) => {

    const form = new FormData();

    for(let key in post){
            form.append(key, post[key])
        }
    
    return await axios.post('http://localhost:4000/posts', form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    
}

export const deletePostRequest = async(id)=>{
    return await axios.delete('/posts/' + id)
}

export const getPostRequests = async(id)=>{
    return await axios.get('/posts/' + id)
}

export const updatePostRequests = async(id,newPost)=>{
    return await axios.put('/posts/' +id, newPost)
}