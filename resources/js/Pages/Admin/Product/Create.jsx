import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ categories, brands }) {
    const [isBulkOrder, setIsBulkOrder] = useState(false);
    const [bulkInputValues, setBulkInputValues] = useState([{
        quantity: "",
        price: "",
    }]);

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
        bulks: [{
            quantity: "",
            price: "",
        }],
    })



    function submit(e) {
        e.preventDefault()
        data.bulks = bulkInputValues;
        post('/admin/products')
    }

    const handleAddMore = () => {
        setBulkInputValues([...bulkInputValues, { quantity: '', price: '' }]);
    };

    const handleRemove = (index) => {
        const newInputValues = [...bulkInputValues];
        newInputValues.splice(index, 1);
        setBulkInputValues(newInputValues);
    };

    const handlePriceChange = (value, index) => {
        const newInputValues = [...bulkInputValues];
        newInputValues[index].price = value;
        setBulkInputValues(newInputValues);
    }

    const handleQuantityChange = (value, index) => {
        const newInputValues = [...bulkInputValues];
        newInputValues[index].quantity = value;
        setBulkInputValues(newInputValues);
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
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Bulk Order</span>
                        <input type="checkbox" className="checkbox checkbox-primary" onChange={() => setIsBulkOrder(!isBulkOrder)} />
                    </div>
                </label>
                {isBulkOrder && (
                    <>{
                        bulkInputValues.map((item, index) => (
                            <div className='flex items-center gap-2' key={index}>
                                <div className="label">
                                    <span className="label-text">Quantity</span>
                                </div>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={e => handleQuantityChange(e.target.value, index)}
                                />
                                <div className="label">
                                    <span className="label-text">Price</span>
                                </div>
                                <input
                                    type="number"
                                    className="input input-bordered w-full max-w-xs"
                                    value={item.price}
                                    onChange={e => handlePriceChange(e.target.value, index)}
                                />
                                <button type="button" className='text-white btn btn-error btn-xs' onClick={() => handleRemove(index)}>
                                    Remove
                                </button>
                            </div>
                        ))
                    }
                        <button type="button" className="bg-yellow-500 hover:bg-blue-700 text-white btn btn-xs" onClick={handleAddMore}>
                            Add More
                        </button>
                    </>
                )}
                <br />
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

                <button className="bg-blue-500 hover:bg-blue-700 text-white btn mt-2 mb-2" disabled={processing}>Create</button>
            </form>
        </AuthenticatedLayout >
    )
}