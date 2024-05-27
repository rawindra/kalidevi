import FrontLayout from "@/Layouts/FrontLayout";
import { Head, Link } from "@inertiajs/react";

export default function Order({ orders }) {
    return (
        <FrontLayout>
            <Head title="Orders" />
            <div className="grid grid-cols-1 gap-6">
                {orders.map((order) => (
                    <div key={order.id} className="max-w-sm w-full lg:max-w-full rounded overflow-hidden shadow-lg p-4">
                        <span className="flex justify-end text-orange-500 mb-2"><span className="text-green-500 me-2">Status: </span>{order.order_status}</span>
                        {order.order_items.map((item) => (
                            <div
                                className="flex flex-col md:flex-row md:items-center justify-between border gap-6 p-4 border-gray-200 rounded"
                                key={item.id}
                            >
                                <div className="md:w-28">
                                    <img
                                        src={item.product.media[0]?.original_url}
                                        alt="product 6"
                                        className="w-full"
                                    />
                                </div>
                                <div className="sm:w-1/3">
                                    <Link
                                        href={route(
                                            "products.show",
                                            item.product.id
                                        )}
                                        className="text-orange-800 text-xl font-medium uppercase"
                                    >
                                        {item.product.name}
                                    </Link>
                                    <p className="text-gray-500 text-sm">
                                        {" "}
                                        <span className="text-green-600">
                                            Quantity: {item.quantity}
                                        </span>
                                    </p>
                                </div>
                                <div className="text-primary text-lg font-semibold">
                                    Rs {item.product.price}
                                </div>

                                <div className="flex gap-2"></div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </FrontLayout>
    );
}
