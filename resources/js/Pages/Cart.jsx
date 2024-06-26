import FrontLayout from '@/Layouts/FrontLayout';
import { Head, Link } from '@inertiajs/react';
import { FaTrash } from 'react-icons/fa';
import ProductFilter from './Components/ProductFilter';

export default function Cart({ cart_items }) {

    return (
        <FrontLayout>
            <Head title="Cart" />
            <div className="grid grid-cols-1 gap-6">

                {cart_items.map((my_list, index) =>
                    <div className="flex flex-col md:flex-row md:items-center justify-between border gap-6 p-4 border-gray-200 rounded" key={index}>
                        <div className="md:w-28">
                            <img src={my_list.product.media[0]?.original_url} alt="product 6" className="w-full" />
                        </div>
                        <div className="md:w-1/3">
                            <Link href={route("products.show", my_list.product.id)} className="text-orange-800 text-xl font-medium uppercase">{my_list.product.name}</Link>
                            <ProductFilter filters={my_list.filter} />
                        </div>
                        <div className="text-primary text-lg font-semibold">Quantity:  {my_list.quantity}</div>
                        {my_list.price
                            ?
                            <div className="text-primary text-lg font-semibold">Rs {my_list.price}</div>
                            :
                            <div className="text-primary text-lg font-semibold">Rs {my_list.product.price * my_list.quantity}</div>
                        }

                        <div className='flex gap-2'>
                            <Link href={route("cart.delete", my_list)} method="delete" as="button" className="px-6 py-2 text-center text-sm text-white bg-red-800 border border-red-800 rounded hover:bg-transparent hover:text-red-800 transition uppercase font-roboto font-medium">
                                <FaTrash />
                            </Link>
                        </div>
                    </div>

                )
                }

                <Link href={'/checkout'} className="bg-blue-500 hover:bg-blue-700 text-white btn mt-2 mb-2">Checkout</Link>

            </div>
        </FrontLayout>

    );
}
