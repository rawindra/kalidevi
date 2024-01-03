import FrontLayout from '@/Layouts/FrontLayout';
import { Link, Head } from '@inertiajs/react';
import { FaTrash, FaShoppingBag  } from 'react-icons/fa';
import ProductFilter from './Components/ProductFilter';

export default function Cart({ cart_items }) {

    return (
        <FrontLayout>
            <Head title="Cart" />
            <div className="col-span-9 space-y-4">

                {cart_items.map((my_list, index) => 
                    <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded" key={index}>
                        <div className="w-28">
                            <img src={my_list.product.media[0].original_url} alt="product 6" className="w-full" />
                        </div>
                        <div className="w-1/3">
                            <Link href={route("products.show", my_list.product.id)} className="text-gray-800 text-xl font-medium uppercase">{my_list.product.name}</Link>
                            <ProductFilter filters = {my_list.filter}/>
                        </div>
                        <div className="text-primary text-lg font-semibold">Quantity:  {my_list.quantity}</div>
                        <div className="text-primary text-lg font-semibold">Rate: Rs {my_list.product.price}</div>
                        <div className="text-primary text-lg font-semibold">Rs {my_list.product.price * my_list.quantity}</div>

                        <div className='flex gap-2'>

                            <Link href={route("cart.delete", my_list)} method="delete" as="button" className="px-6 py-2 text-center text-sm text-white bg-red-800 border border-red-800 rounded hover:bg-transparent hover:text-red-800 transition uppercase font-roboto font-medium">
                                <FaTrash />
                            </Link>
                        </div>
                    </div>
                    
                )
                }

            </div>
        </FrontLayout>

    );
}
