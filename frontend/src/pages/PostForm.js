import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { usePosts } from '../context/postContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'

export default function PostForm() {

    const { createPost, getPost, updatePost } = usePosts()
    const navigate = useNavigate()
    const params = useParams()
    const [post, setPost] = useState({
        title:'',
        description:'',
        image: null
    })


    useEffect(()=>{
        
        (async ()=>{
            if(params.id){
                const data = await getPost(params.id)
                setPost(data)
                
            }
        })()
    },[params.id])
    
    return (
        <div className='flex items-center justify-center'>

            <div className='bg-zinc-800 p-10 shadow-md shadow-black'>
            <div className='flex justify-between items-center py-4 text-white'>
                <h3 className='text-xl '>New Post</h3>
                <Link to='/' className='text-gray-400 text-sm hover:text-gray-300' >Go back</Link>
            </div>
            <Formik 
            enableReinitialize
            initialValues={{
                title: post.title,
                description: post.description,
                image: post.image,
            }}
                validationSchema={Yup.object({
                    title: Yup.string().required('Title is required'),
                    description: Yup.string().required('Description is required')
                })}
                onSubmit={async (values, actions) => {
                    
                    if(params.id){
                        await updatePost(params.id, values)
                    }else{
                        await createPost(values)
                    }

                    navigate('/')
                }}
                
            >
                {({ handleSubmit, setFieldValue }) => (
                    <Form onSubmit={handleSubmit}>
                        <label htmlFor='title' className='text-sm block font-bold text-gray-400'>Title</label>
                        <Field className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full' name='title' placeholder="title" />
                        <ErrorMessage component="p" className='text-red-400 text-sm' name='title' />
                        <label htmlFor='description' className='text-sm block font-bold text-gray-400'>Description</label>
                        <Field component="textarea" className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full' name='description' placeholder="description" />
                        <ErrorMessage component="p" className='text-red-400 text-sm' name='description' />

                        <label htmlFor='image' className='text-sm block font-bold text-gray-400'>Image</label>

                        <input type="file" name="image" className="px-3 py-2 focus:outline-none rounded bg-gray-600 w-full"
                        onChange={(e)=> {
                            setFieldValue("image", e.target.files[0])  
                        }} />


                        <button className='bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400' type='submit' >Save</button>
                    </Form>
                )}
            </Formik>
            </div>

        </div>
    )
}
