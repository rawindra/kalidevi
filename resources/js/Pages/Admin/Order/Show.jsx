import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Show({ orderItems }) {
    console.log(orderItems)
    return (
        <AuthenticatedLayout>
            <Head title="Order Details" />

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Filter</th>
                        </tr>
                    </thead>
                    <tbody>

                        {orderItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.product.name}</td>
                                <td>{item.quantity}</td>
                                <td>{
                                    Object.entries(JSON.parse(item.filter)).map(([key, value]) => (
                                        <li key={key}>
                                            <strong>{key}: </strong>{value}
                                        </li>
                                    ))
                                }</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        </AuthenticatedLayout>
    )
}