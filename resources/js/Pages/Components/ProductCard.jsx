import { Link } from '@inertiajs/react'
import React from 'react'
import { FaHeart, FaSearch, FaEye } from 'react-icons/fa'

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white shadow rounded overflow-hidden group">
            <div className="relative">
                <img src={product.media[0].original_url} alt="product 1" className="w-full" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <Link href={'/products/' + product.id}
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                        title="view product">
                        <FaEye />
                    </Link>
                    <Link href={route('wishlist.store')}
                        data={{ product_id: product.id }}
                        method="post"
                        as="button"
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                        title="add to wishlist">
                        <FaHeart />
                    </Link>
                </div>
            </div>
            <div className="pt-4 pb-3 px-4">
                <Link href={'/products/' + product.id}>
                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                        {product.name}</h4>
                </Link>
                <div className="flex items-baseline mb-1 space-x-2">
                    <p className="text-xl text-primary font-semibold">{product.price}</p>
                </div>

            </div>
            <a href="#"
                className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">Add
                to cart</a>
        </div>
    )
}

export default ProductCard