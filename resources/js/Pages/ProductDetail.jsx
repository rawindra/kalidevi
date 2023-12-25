import React from 'react'
import FrontLayout from '@/Layouts/FrontLayout';
import { Head } from '@inertiajs/react';

const ProductDetail = ({ product }) => {
    return (
        <FrontLayout>
            <Head title="Kalidevi Store" />
            <div className="container mx-auto my-8 p-8 bg-white shadow-md rounded-md">
                <div className="grid grid-cols-2 gap-8">
                    <div className="col-span-1">
                        <img src={product.media[0].original_url} alt={product.name} className="w-full h-auto rounded-md shadow-md" />
                    </div>

                    <div className="col-span-1">
                        <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
                        <p className="text-gray-700 mb-4">{product.category.name} | {product.brand.name}</p>
                        <p className="text-xl text-blue-500 font-semibold mb-4">Rs. {product.price}</p>
                        {product.options.map((filter, index) => (
                            <div className="mb-4" key={index}>
                                <label htmlFor="color" className="text-gray-600">{filter.name}</label>
                                <select
                                    className="block w-full p-2 border rounded-md bg-white focus:outline-none focus:ring focus:border-blue-300">
                                    {filter.pivot.options.map((option, index) => (
                                        <option value={option} key={index}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        ))}

                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                            Add to Cart
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
                    <p className="text-gray-700">{product.description}</p>
                </div>
            </div>
        </FrontLayout>
    )
}

export default ProductDetail