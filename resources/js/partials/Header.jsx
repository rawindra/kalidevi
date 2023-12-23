import React from 'react'
import { Link } from '@inertiajs/react'

const Header = () => {
    return (
        <header className='container mx-auto h-[50px]'>
            <nav className='h-full flex justify-between items-center'>
                <p className='text-red-500'>Kalidevi Store</p>
                <ul className='flex gap-x-2'>
                    <li className='hover:text-orange-500'><Link>Shop</Link></li>
                    <li className='hover:text-orange-500'><Link>Cart</Link></li>
                    <li className='text-orange-300 hover:text-orange-500'><Link href={route('login')}>Login</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header