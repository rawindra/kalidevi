import { Link } from '@inertiajs/react'
import React from 'react'
import { FaChevronRight, FaHouseDamage } from 'react-icons/fa'

const BreadCrumb = () => {
    return (
        <div class="container py-4 flex items-center gap-3">
            <Link href={"/"} class="text-primary text-base">
                <FaHouseDamage />
            </Link>
            <span class="text-sm text-gray-400">
                <FaChevronRight />
            </span>
            <p class="text-gray-600 font-medium">Shop</p>
        </div>
    )
}

export default BreadCrumb