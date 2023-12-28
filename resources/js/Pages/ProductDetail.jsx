import React from 'react'
import FrontLayout from '@/Layouts/FrontLayout';
import { Head } from '@inertiajs/react';
import BreadCrumb from './Components/BreadCrumb';

const ProductDetail = ({ product, selectedAttributes }) => {
    return (
        <FrontLayout>
            <Head title="Kalidevi Store" />
            <BreadCrumb title="Product Detail" />
            <div className="container grid grid-cols-2 gap-6">
                <div>
                    <img src={product.media[0].original_url} alt={product.name} className="w-full" />
                </div>

                <div>
                    <h2 className="text-3xl font-medium uppercase mb-2">{product.name}</h2>
                    <div className="space-y-2">
                        <p className="text-gray-800 font-semibold space-x-2">
                            <span>Availability: </span>
                            <span className="text-green-600">{product.stock ? 'In Stock' : 'Out of Stock'}</span>
                        </p>
                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">Brand: </span>
                            <span className="text-gray-600">{product.brand.name}</span>
                        </p>
                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">Category: </span>
                            <span className="text-gray-600">{product.category.name}</span>
                        </p>
                    </div>
                    <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                        <p className="text-xl text-primary font-semibold">Rs {product.price}</p>
                    </div>

                    {Object.keys(selectedAttributes).map((attributeName, index) => (
                        <div className="pt-4" key={index}>
                            <label htmlFor="color" className="text-gray-600">{attributeName}</label>
                            <select
                                className="block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
                                {selectedAttributes[attributeName].map((option, index) => {
                                    const key = Object.keys(option)[0];
                                    const value = option[key];
                                    return (
                                        <option value={key} key={index}>{value}</option>
                                    )
                                }
                                )}
                            </select>
                        </div>
                    ))}

                    <div className="mt-4">
                        <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
                        <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                            <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">-</div>
                            <div className="h-8 w-8 text-base flex items-center justify-center">1</div>
                            <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">+</div>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                        <a href="#"
                            className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                            <i className="fa-solid fa-bag-shopping"></i> Add to cart
                        </a>
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
                    <div className="text-gray-600">
                        <p>{product.description}</p>
                    </div>

                </div>
            </div>
        </FrontLayout >
    )
}

export default ProductDetail