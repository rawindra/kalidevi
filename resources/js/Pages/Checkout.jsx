import React from 'react'
import FrontLayout from '@/Layouts/FrontLayout';
import { Link, Head, useForm } from '@inertiajs/react';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import ProductFilter from './Components/ProductFilter';

export default function Checkout({ cart_items }) {

    let totalPrice = 0;
    cart_items.forEach(item => {
        const price = item.price ? parseFloat(item.price) : parseFloat(item.product.price);
        const quantity = parseInt(item.quantity);
        totalPrice += item.price ? parseFloat(item.price) : price * quantity;
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        contactAddress: '',
    });


    const placeOrder = (e) => {
        // data.firstName,
        // data.lastName,
        // data.mobileNumber,
        // data.contactAddress
        e.preventDefault();
        console.log(e);
        post(route('checkout.post'));
    }

    return (
        <FrontLayout>
            <Head title="Checkout" />
            <div>
                <div className="container py-4 flex items-center gap-3">
                    <Link href={route('home')} className="text-primary text-base">
                        <FaHome></FaHome>
                    </Link>
                    <span className="text-sm text-gray-400">
                        <FaChevronRight></FaChevronRight>
                    </span>
                    <p className="text-gray-600 dark:text-white font-medium">Checkout</p>
                </div>
                <form onSubmit={placeOrder}>
                    <div className="container grid grid-cols-1 md:grid-cols-2 items-start pb-16 pt-4 gap-6">
                        <div className="border border-gray-200 p-4 rounded">
                            <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="first-name"
                                            value="First Name"
                                            className="text-gray-600 dark:text-white"
                                        />
                                        <TextInput
                                            id="first-name"
                                            name="first_name"
                                            value={data.firstName}
                                            onChange={e => setData('firstName', e.target.value)}
                                            className="input-box"
                                        />
                                        {errors.firstName && <span className='text-red-500'>{errors.firstName}</span>}
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="last-name"
                                            value="Last Name"
                                            className="text-gray-600 dark:text-white"
                                        />
                                        <TextInput
                                            id="last-name"
                                            name="last_name"
                                            value={data.lastName}
                                            onChange={e => setData('lastName', e.target.value)}
                                            className="input-box"
                                        />
                                        {errors.lastName && <span className='text-red-500'>{errors.lastName}</span>}
                                    </div>
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="mobile-number"
                                        value="Mobile Number"
                                        className="text-gray-600 dark:text-white"
                                    />
                                    <TextInput
                                        id="mobile-number"
                                        name="mobile_number"
                                        value={data.mobileNumber}
                                        onChange={e => setData('mobileNumber', e.target.value)}
                                        className="input-box"
                                    />
                                    {errors.mobileNumber && <span className='text-red-500'>{errors.mobileNumber}</span>}
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="contact-address"
                                        value="Contact Address"
                                        className="text-gray-600 dark:text-white"
                                    />
                                    <TextInput
                                        id="contact-address"
                                        name="contact_address"
                                        value={data.contactAddress}
                                        onChange={e => setData('contactAddress', e.target.value)}
                                        className="input-box"
                                    />
                                    {errors.contactAddress && <span className='text-red-500'>{errors.contactAddress}</span>}
                                </div>
                            </div>

                        </div>
                        <div className="border border-gray-200 p-4 rounded">
                            <h4 className="text-gray-600 dark:text-white text-lg mb-4 font-medium uppercase">order summary</h4>
                            <div className="space-y-2">
                                {cart_items.map((cart_item, index) =>
                                    <div className="flex justify-between" key={index}>
                                        <div>
                                            <h5 className="text-gray-600 dark:text-white font-medium">{cart_item.product.name}</h5>
                                            <ProductFilter filters={cart_item.filter} />
                                        </div>
                                        <p className="text-gray-600 dark:text-white">x{cart_item.quantity}</p>
                                        {cart_item.price
                                            ?
                                            <p className="text-gray-600 dark:text-white font-medium">Rs {cart_item.price}</p>
                                            :
                                            <p className="text-gray-600 dark:text-white font-medium">Rs {cart_item.quantity * cart_item.product.price}</p>
                                        }
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between border-t border-gray-200 mt-1 text-gray-600 dark:text-white font-medium py uppercase">
                                <p className="font semi-bold">total</p>
                                <p className="font font-extrabold">{totalPrice.toFixed(2)}</p>
                            </div>
                            {/* <Link
                                // href={route('checkout.post')}
                                onClick={placeOrder}
                                as='button'
                                method='post'
                                className="mt-3 block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
                            >
                                Place order
                            </Link> */}
                            <button
                                type='submit'
                                className="mt-3 block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
                            >
                                Place order
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </FrontLayout>
    )
}
