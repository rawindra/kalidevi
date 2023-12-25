import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ products }) {
    const { delete: destroy, processing } = useForm()
    function submit(e, product) {
        e.preventDefault()
        confirm('Are you sure?') && destroy(`/admin/products/${product.id}`)
    }

    return (
        <AuthenticatedLayout
        >
            <Head title="Product" />
            <Link as="button" href={route('admin.products.create')} className="btn">Create</Link>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Featured</th>
                            <th>Published</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product.media[0].original_url} alt={product.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{product.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{product.category.name}</td>
                                <td>{product.brand.name}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                                <td>{product.featured ? "featured" : "not featured"}</td>
                                <td>{product.published ? "published" : "not published"}</td>
                                <td className='flex items-center gap-2'>
                                    <Link as="button" href={route('admin.products.edit', product.id)} className="btn btn-warning btn-xs">Edit</Link>
                                    <form onSubmit={(event) => submit(event, product)}>
                                        <button className="btn btn-error btn-xs" disabled={processing}>Delete</button>
                                    </form>
                                    <Link as="button" href={route('admin.products.options.create', product.id)} className="btn btn-info btn-xs">Add Options</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </AuthenticatedLayout>
    )
}