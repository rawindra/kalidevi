import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
    })

    function submit(e, category) {
        e.preventDefault()
        put(`/admin/categories/${category.id}`)
    }

    return (
        <AuthenticatedLayout
        >
            <Head title="Update Category" />
            <form onSubmit={(event) => submit(event, category)}>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Name</span>
                    </div>
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.name && <span className='text-red-500'>{errors.name}</span>}
                </label>

                <button className="btn mt-2 mb-2" disabled={processing}>Update</button>
            </form>
        </AuthenticatedLayout>
    )
}