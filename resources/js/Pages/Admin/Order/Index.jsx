import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ orders }) {
    const { delete: destroy, processing } = useForm()
    function submit(e, order) {
        e.preventDefault()
        confirm('Are you sure?') && destroy(`/admin/orders/${order.id}`)
    }

    return (
        <AuthenticatedLayout
        >
            <Head title="Order" />

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Order Date</th>
                            <th>Customer Name</th>
                            <th>Customer Contact Number</th>
                            <th>Customer Address</th>
                            <th>Order Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.order_date}</td>
                                <td>{order.customer_name}</td>
                                <td>{order.customer_contact_number}</td>
                                <td>{order.customer_address}</td>
                                <td>{order.order_status}</td>
                                <td className='flex items-center gap-2'>
                                    <Link as="button" href={route('admin.orders.show', order.id)} className="btn btn-warning btn-xs">View</Link>
                                    <Link as="button" method='post' href={route('admin.orders.changeStatus', order.id)} className="btn btn-primary btn-xs">Change Status</Link>
                                    <form onSubmit={(event) => submit(event, order)}>
                                        <button className="btn btn-error btn-xs" disabled={processing}>Delete</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </AuthenticatedLayout>
    )
}