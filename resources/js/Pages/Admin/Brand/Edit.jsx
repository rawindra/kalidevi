import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ brand }) {
    const { data, setData, put, processing, errors } = useForm({
        name: brand.name,
    })

    function submit(e, brand) {
        e.preventDefault()
        put(`/admin/brands/${brand.id}`)
    }

    return (
        <AuthenticatedLayout
        >
            <Head title="Update Brand" />
            <form onSubmit={(event) => submit(event, brand)}>
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