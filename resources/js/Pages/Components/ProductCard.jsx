import { Link } from '@inertiajs/react'
import React from 'react'
import { BsPlus, BsEyeFill } from 'react-icons/bs'

const ProductCard = ({ product }) => {
    return (
        <div>
            <div className='border border-[#e4e4e4] h-[300px] group relative'>
                <div className='flex justify-center items-center w-full h-full'>
                    <div className='mx-auto w-[200px] flex justify-center items-center'>
                        <img className='max-h-[160px] group-hover:scale-110 transition duration-300' src={product.media[0].original_url} alt="" />
                    </div>
                </div>
                <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button>
                        <div className='flex justify-center items-center text-white w-12 h-12 bg-red-500'>
                            <BsPlus className="text-3xl" />
                        </div>
                    </button>
                    <Link href={`/products/${product.id}`} className='w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl'>
                        <BsEyeFill />
                    </Link>
                </div>
            </div>
            <div>
                <div className='text-sm capitalize text-gray-500 mb-1'>{product.category.name}</div>
                <Link href={`/products/${product.id}`}>
                    <h2 className='font-semibold mb-1'>{product.name}</h2>
                    <div className='font-semibold'>Rs. {product.price}</div>
                </Link>
            </div>
        </div>
    )
}

export default ProductCard