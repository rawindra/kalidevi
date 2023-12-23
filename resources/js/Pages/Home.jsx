import FrontLayout from '@/Layouts/FrontLayout';
import { Link, Head } from '@inertiajs/react';
import ProductCard from '@/Pages/Components/ProductCard';

export default function Welcome({ products }) {
    return (
        <FrontLayout>
            <Head title="Kalidevi Store" />
            <div className='p-16'>
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
}
