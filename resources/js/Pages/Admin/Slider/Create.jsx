import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'

function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        image: null
    })

    function submit(event) {
        event.preventDefault()
        post('/admin/sliders')
    }
  return (
    <AuthenticatedLayout>
        <Head title="Create Slider" />
        <form onSubmit={submit}>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Title</span>
                </div>
                <input 
                    type="text" 
                    value={data.title}
                    onChange={e => setData('title',e.target.value)}
                    className="text input input-bordered w-full max-w-xs" 
                />
                {errors.title && <span className="text-red-500">{errors.title}</span>}
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Pick a Image</span>
                </div>
                <input
                    type="file"
                    onChange={e => { setData('image', e.target.files[0]) }}
                    className="file-input file-input-bordered w-full max-w-xs"
                />
                {errors.image && <span className='text-red-500'>{errors.image}</span>}
            </label>

            <button className="bg-blue-500 hover:bg-blue-700 text-white btn mt-2 mb-2" disabled={processing}>Create</button>
        </form>
    </AuthenticatedLayout>
  )
}

export default Create