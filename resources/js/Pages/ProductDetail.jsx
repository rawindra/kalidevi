import React, { useState } from 'react'
import FrontLayout from '@/Layouts/FrontLayout';
import { Head, useForm } from '@inertiajs/react';
import BreadCrumb from './Components/BreadCrumb';

const ProductDetail = ({ product, selectedAttributes }) => {
    const [isBulkOrder, setIsBulkOrder] = useState(false);

    let initialFilter = {};

    Object.keys(selectedAttributes).forEach(attributeName => {
        const firstObject = selectedAttributes[attributeName][0];
        const key = Object.keys(firstObject)[0];
        const value = firstObject[key];
        initialFilter[attributeName] = value;
    });

    const [quantity, setQuantity] = useState(1);
    const [bulkQuantity, setBulkQuantity] = useState();
    const [bulkPrice, setBulkPrice] = useState();

    const [filter, setFilter] = useState(initialFilter);

    const { data, post, processing } = useForm({
        filter: filter
    });

    function increment() {
        if (quantity < product.stock) {
            setQuantity(quantity => quantity + 1);
        }
    }

    function decrement() {
        if (quantity > 1) {
            setQuantity(quantity => quantity - 1);
        }
    }

    function handleSelectChange(attributeName, selectedValue) {
        setFilter(prevFilters => ({
            ...prevFilters,
            [attributeName]: selectedValue
        }));

    }

    const handleChange = (quantity, price) => {
        setBulkQuantity(quantity);
        setBulkPrice(price);
    }

    const addToCart = () => {
        data.quantity = quantity;
        data.product_id = product.id;
        data.filter = filter;
        if (isBulkOrder) {
            data.quantity = bulkQuantity;
            data.price = bulkPrice;
        }
        post(route('cart.manage'));
    }

    return (
        <FrontLayout>
            <Head title="Kalidevi Store" />
            <BreadCrumb title="Product Detail" />
            <div className="container grid grid-cols-2 gap-6">
                <div>
                    <img src={product.media[0]?.original_url} alt={product.name} className="w-full h-[400px]" />
                </div>

                <div>
                    <h2 className="text-3xl font-medium uppercase mb-2">{product.name}</h2>
                    <div className="space-y-2">
                        <p className="text-orange-800 font-semibold space-x-2">
                            <span>Availability: </span>
                            <span className="text-green-600">{product.stock ? 'In Stock' : 'Out of Stock'}</span>
                        </p>
                        <p className="space-x-2">
                            <span className="text-orange-800 font-semibold">Brand: </span>
                            <span className="text-gray-600">{product.brand.name}</span>
                        </p>
                        <p className="space-x-2">
                            <span className="text-orange-800 font-semibold">Category: </span>
                            <span className="text-gray-600">{product.category.name}</span>
                        </p>
                    </div>
                    <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                        <p className="text-xl text-primary font-semibold">Rs {product.price}</p>
                    </div>
                    <div className="pt-4 flex gap-2">
                        {Object.keys(selectedAttributes).map((attributeName, index) => (
                            <div key={index} className="flex flex-col">
                                <label htmlFor="color" className="text-orange-600">{attributeName}</label>
                                <select
                                    onChange={(e) => handleSelectChange(attributeName, e.target.value)}
                                    className="w-[200px] text-violet-900 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
                                    {selectedAttributes[attributeName].map((option, index) => {
                                        const key = Object.keys(option)[0];
                                        const value = option[key];
                                        return (
                                            <option value={value} key={index}>{value}</option>
                                        )
                                    }
                                    )}
                                </select>
                            </div>
                        ))}
                    </div>

                    {product.bulks.length >= 1 && <div className='mt-4'>
                        <p className="space-x-2">
                            <span className="text-orange-800 font-semibold">Bulk Order: </span>
                            <input type="checkbox" className="checkbox checkbox-primary" onChange={() => setIsBulkOrder(!isBulkOrder)} />
                        </p>
                    </div>}
                    {isBulkOrder ? (
                        <>
                            {product?.bulks?.map((bulk, index) => (
                                <div className="mt-4" key={index}>
                                    <div className="w-max">
                                        <input type="radio" name="quantity" onChange={() => handleChange(bulk.quantity, bulk.price)} />
                                        <span className='text-sm text-orange-800 uppercase mb-1'>Quantity: </span>
                                        <span className='mr-2'>{bulk.quantity}</span>
                                        <span className='text-sm text-orange-800 uppercase mb-1'>Price: </span>
                                        <span>Rs {bulk.price}</span>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : <div className="mt-4">
                        <h3 className="text-sm text-orange-800 uppercase mb-1">Quantity</h3>
                        <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                            <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none" onClick={decrement}>-</div>
                            <div className="h-8 w-8 text-white text-base flex items-center justify-center">{quantity}</div>
                            <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none" onClick={increment}>+</div>
                        </div>
                    </div>
                    }
                    <div className="mt-6 flex gap-3 pb-5 pt-5">
                        <button onClick={addToCart}
                            className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                            <i className="fa-solid fa-bag-shopping"></i> Add to cart
                        </button>
                        <a href="#"
                            className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition">
                            <i className="fa-solid fa-heart"></i> Wishlist
                        </a>
                    </div>
                </div>
            </div>

            <div className="container pb-16">
                <h3 className="border-b border-gray-200 font-roboto text-orange-800 pt-3 pb-3 font-medium">Product Description</h3>
                <div className="w-3/5 pt-6">
                    <div className="text-black dark:text-white">
                        <p>{product.description}</p>
                    </div>

                </div>
            </div>
        </FrontLayout >
    )
}

export default ProductDetail