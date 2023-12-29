import React from 'react'
import { Link, usePage } from '@inertiajs/react'
import { FaBars, FaHeart, FaSearch, FaShoppingBag, FaUser } from 'react-icons/fa'

const Header = () => {
    const categories = usePage().props.categories;
    const wishlist = usePage().props.wishlist;
    const cart = usePage().props.cart;

    return (
        <>
            <header className="py-4 shadow-sm bg-white">
                <div className="container flex items-center justify-between">
                    <Link href={'/'} className='font-bold text-red-500'>Kalidevi Store</Link >
                    <div className="w-full max-w-xl relative flex">
                        <span className="absolute left-4 top-[15px] text-lg text-gray-400">
                            <FaSearch className="fa-solid fa-magnifying-glass" />
                        </span>
                        <input type="text" name="search" id="search"
                            className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
                            placeholder="search" />
                        <button
                            className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex items-center">Search</button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link href={'wishlist'} className="text-center text-gray-700 hover:text-primary transition relative">
                            <div className="text-2xl">
                                <FaHeart />
                            </div>
                            <div className="text-xs leading-3">Wishlist</div>
                            <div
                                className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                                {wishlist?.length ?? 0}</div>
                        </Link>
                        <Link href={'cart'} className="text-center text-gray-700 hover:text-primary transition relative">
                            <div className="text-2xl">
                                <FaShoppingBag />
                            </div>
                            <div className="text-xs leading-3">Cart</div>
                            <div
                                className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                                {cart?.length ?? 0}</div>
                        </Link>
                        <a href="#" className="text-center text-gray-700 hover:text-primary transition relative">
                            <div className="text-2xl">
                                <FaUser />
                            </div>
                            <div className="text-xs leading-3">Account</div>
                        </a>
                    </div>
                </div>
            </header>
            <nav className="bg-gray-800">
                <div className="container flex">
                    <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
                        <span className="text-white">
                            <FaBars />
                        </span>
                        <span className="capitalize ml-2 text-white hidden">All Categories</span>

                        <div
                            className="absolute min-w-[200px] left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
                            {categories.map((category, index) =>
                                <Link href={`/shop/category/${category.id}`} className="flex items-center px-6 py-3 hover:bg-gray-100 transition" key={index}>
                                    <span className="ml-6 text-gray-600 text-sm">{category.name}</span>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
                        <div className="flex items-center space-x-6 capitalize">
                            <a href="index.html" className="text-gray-200 hover:text-white transition">Home</a>
                            <a href="pages/shop.html" className="text-gray-200 hover:text-white transition">Shop</a>
                            <a href="#" className="text-gray-200 hover:text-white transition">About us</a>
                            <a href="#" className="text-gray-200 hover:text-white transition">Contact us</a>
                        </div>
                        <Link className="text-gray-200 hover:text-white transition" href={route('login')}>Login</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header