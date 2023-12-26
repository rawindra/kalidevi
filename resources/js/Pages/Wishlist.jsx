import FrontLayout from '@/Layouts/FrontLayout';
import { Link, Head } from '@inertiajs/react';
import { FaHeart, FaSearch } from 'react-icons/fa';

export default function Wishlist({ wishlist }) {
    return (
        <FrontLayout>
            <Head title="Wishlist" />
            <div className="col-span-9 space-y-4">

                {wishlist.map((my_list, index) => 
                    <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded" key={index}>
                        <div className="w-28">
                            <img src={my_list.product.media[0].original_url} alt="product 6" className="w-full" />
                        </div>
                        <div className="w-1/3">
                            <h2 className="text-gray-800 text-xl font-medium uppercase">{my_list.product.name}</h2>
                            <p className="text-gray-500 text-sm">Availability: <span className="text-green-600">In Stock: {my_list.product.stock}</span></p>
                        </div>
                        <div className="text-primary text-lg font-semibold">Rs {my_list.product.price}</div>
                        <a href="#"
                            className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">add
                            to cart</a>

                        <div className="text-gray-600 cursor-pointer hover:text-primary">
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </div>
                )}

            </div>
        </FrontLayout>

    );
}
