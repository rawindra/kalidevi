import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ filters }) {
    const { delete: destroy, processing } = useForm()

    function submit(e, filter) {
        e.preventDefault()
        confirm('Are you sure?') && destroy(`/admin/filters/${filter.id}`)

    }

    return (
        <AuthenticatedLayout
        >
            <Head title="Filter" />
            <Link as="button" href={route('admin.filters.create')} className="btn">Create</Link>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Options</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filters.map(filter => (
                            <tr key={filter.id}>
                                <td>{filter.name}</td>
                                <td>{filter.options.map((option, index) => <span key={index}>{option},</span>)}</td>
                                <td className='flex items-center gap-2'>
                                    <Link as="button" href={route('admin.filters.edit', filter.id)} className="btn btn-warning btn-xs">Edit</Link>
                                    <form onSubmit={(event) => submit(event, filter)}>
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