import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

import React from 'react'

function Index( { sliders }) {
    const { delete: destroy, processing } = useForm()

    function submit(e, slider) {
        e.preventDefault()
        confirm('Are you sure?') && destroy(`/admin/sliders/${slider.id}`)
    }
  return (
    <AuthenticatedLayout>
        <Head title="Sliders" />
        <Link as="button" href={route('admin.sliders.create')} className="bg-blue-500 hover:bg-blue-700 text-white btn">Create</Link>
    
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sliders.map(slider => (
                        <tr key={slider.id}>
                            <td>{slider.title}</td>
                            <td className="flex items-center gap-2">
                                <Link as="button" href={route('admin.sliders.edit', slider.id)} className="btn btn-warning btn-xs">Edit</Link>
                                <form onSubmit={(event) => submit(event, slider)}>
                                    <button className="btn btn-error btn-xs" disabled={processing}>Delete</button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </AuthenticatedLayout>
  )
}

export default Index