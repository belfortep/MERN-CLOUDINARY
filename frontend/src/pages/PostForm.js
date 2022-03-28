import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { usePosts } from '../context/postContext'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function PostForm() {

    const { createPost } = usePosts()
    const navigate = useNavigate()

    return (
        <div>

            <Formik initialValues={{
                title: '',
                description: ''
            }}
                validationSchema={Yup.object({
                    title: Yup.string().required('Title is required'),
                    description: Yup.string().required('Description is required')
                })}
                onSubmit={async (values, actions) => {
                    await createPost(values)
                    navigate('/')
                }}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Field className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full' name='title' placeholder="title" />
                        <ErrorMessage component="p" className='text-red-400 text-sm' name='title' />
                        <Field className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full' name='description' placeholder="description" />
                        <ErrorMessage component="p" className='text-red-400 text-sm' name='description' />
                        <button type='submit' >Save</button>
                    </Form>
                )}
            </Formik>

        </div>
    )
}
