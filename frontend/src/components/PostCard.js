import React from 'react'
import { usePosts } from '../context/postContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export default function PostCard({ post }) {
    const navigate = useNavigate()
    const {deletePost} = usePosts()

    const handleDelete = (_id) =>{
        toast((t)=>(    //funcion de toast para enviar las pequeñas notificaciones
            <div>
                <p className='text-white'>Are you sure to delete? <strong>{_id}</strong></p>
                <div>
                    <button className='bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2' onClick={()=> {
                        deletePost(_id)
                        toast.dismiss(t.id)
                    }}>Delete</button>
                    <button className='bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2' onClick={()=> toast.dismiss(t.id)}>Cancel</button>
                </div>
            </div>
        ), {
            style:{
                background:"#202020"
            }
        })
    }

    return (
        <div className='hover:bg-zinc-700 hover:cursor-pointer bg-zinc-800 text-white rounded-sm shadow-md shadow-black'
            onClick={()=> navigate('/posts/'+ post._id)}
        >
            <div className='px-4 py-7'>
                <div className='flex justify-between'>
                    <h3>
                        {post.title}
                    </h3>
                    <button className='bg-red-600 text-sm px-2 py-1 rounded-sm'
                    onClick={(e)=> {
                        e.stopPropagation();
                        handleDelete(post._id)
                    }}>
                        Delete
                    </button>
                </div>
                <p>
                    {post.description}
                </p>
                {post.image && <img src={post.image.url} />}
            </div>
        </div>
    )
}
