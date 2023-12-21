import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ brands }) {
    const { delete: destroy, processing } = useForm()

    function submit(e, brand) {
        e.preventDefault()
        confirm('Are you sure?') && destroy(`/admin/brands/${brand.id}`)
    }

    return (
        <AuthenticatedLayout
        >
            <Head title="Brand" />
            <Link as="button" href={route('admin.brands.create')} className="btn">Create</Link>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map(brand => (
                            <tr key={brand.id}>
                                <td>{brand.name}</td>
                                <td className='flex items-center justify-center gap-2'>
                                    <Link as="button" href={route('admin.brands.edit', brand.id)} className="btn btn-warning btn-xs">Edit</Link>
                                    <form onSubmit={(event) => submit(event, brand)}>
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