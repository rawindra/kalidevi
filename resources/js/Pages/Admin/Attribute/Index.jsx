import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ attributes }) {
    const { delete: destroy, processing } = useForm()

    function submit(e, attribute) {
        e.preventDefault()
        confirm('Are you sure?') && destroy(`/admin/attributes/${attribute.id}`)

    }

    return (
        <AuthenticatedLayout
        >
            <Head title="Filter" />
            <Link as="button" href={route('admin.attributes.create')} className="bg-blue-500 hover:bg-blue-700 text-white btn">Create</Link>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Values</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attributes.map(attribute => (
                            <tr key={attribute.id}>
                                <td>{attribute.name}</td>
                                <td>{attribute.values.map((value, index) => <span key={index}>{value.name},</span>)}</td>
                                <td className='flex items-center gap-2'>
                                    <Link as="button" href={route('admin.attributes.edit', attribute.id)} className="btn btn-warning btn-xs">Edit</Link>
                                    <form onSubmit={(event) => submit(event, attribute)}>
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