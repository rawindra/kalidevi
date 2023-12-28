import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ categories, brands }) {
    const { data, setData, post, processing, errors } = useForm({
        brand_id: '',
        category_id: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        featured: false,
        published: true,
        image: {},
    })

    function submit(e) {
        e.preventDefault()
        post('/admin/products')
    }

    return (
        <AuthenticatedLayout
        >
            <Head title="Create Product" />
            <form onSubmit={submit}>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Brand</span>
                    </div>
                    <select
                        className="select select-bordered w-full max-w-xs"
                        value={data.brand_id}
                        onChange={e => setData('brand_id', e.target.value)}
                    >
                        <option disabled value="">Select Brand</option>
                        {brands.map((brand, index) => (
                            <option value={brand.id} key={index}>{brand.name}</option>
                        ))}
                    </select>
                    {errors.brand_id && <span className='text-red-500'>{errors.brand_id}</span>}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Category</span>
                    </div>
                    <select
                        value={data.category_id}
                        onChange={e => setData('category_id', e.target.value)}
                        className="select select-bordered w-full max-w-xs"
                    >
                        <option disabled value="">Select Category</option>
                        {categories.map((category, index) => (
                            <option value={category.id} key={index}>{category.name}</option>
                        ))}
                    </select>
                    {errors.category_id && <span className='text-red-500'>{errors.category_id}</span>}
                </label>
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
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Description</span>
                    </div>
                    <textarea
                        type="text"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        className="textarea textarea-bordered w-full max-w-xs"
                    />
                    {errors.description && <span className='text-red-500'>{errors.description}</span>}
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
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Price</span>
                    </div>
                    <input
                        type="number"
                        step="0.01"
                        value={data.price}
                        onChange={e => setData('price', e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.price && <span className='text-red-500'>{errors.price}</span>}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Stock</span>
                    </div>
                    <input
                        type="number"
                        value={data.stock}
                        onChange={e => setData('stock', e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.stock && <span className='text-red-500'>{errors.stock}</span>}
                </label>
                <div className="form-control w-full max-w-xs">
                    <label className="label cursor-pointer">
                        <span className="label-text">Published</span>
                        <input
                            type="checkbox"
                            onChange={e => { setData('published', e.target.checked) }}
                            className="checkbox"
                        />
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label cursor-pointer">
                        <span className="label-text">Featured</span>
                        <input
                            type="checkbox"
                            onChange={e => setData('featured', e.target.checked)}
                            className="checkbox"
                        />
                    </label>
                </div>

                <button className="btn mt-2 mb-2" disabled={processing}>Create</button>
            </form>
        </AuthenticatedLayout>
    )
}