import FrontLayout from '@/Layouts/FrontLayout';
import { Link, Head } from '@inertiajs/react';
import ProductCard from '@/Pages/Components/ProductCard';

export default function Home({ products, categories }) {
    return (
        <FrontLayout>
            <Head title="Kalidevi Store" />
            <div className="container mx-auto">
                <div className="grid grid-cols-2">
                    <div className="max-w-[500px]">
                        {categories.map((category, index) => {
                            return (<div key={index} className="flex items-center">
                                <Link href={`/shop/category/${category.id}`}
                                    className="ml-3 text-sm text-gray-600"
                                >
                                    {category.name}
                                </Link>
                            </div>)
                        })}
                    </div>
                    <div className='max-w-full'>
                        Slider
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </FrontLayout>
    );
}
