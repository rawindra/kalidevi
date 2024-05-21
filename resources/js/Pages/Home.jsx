import FrontLayout from '@/Layouts/FrontLayout';
import ProductCard from '@/Pages/Components/ProductCard';
import { Head, Link } from '@inertiajs/react';

export default function Home({ products, featuredProducts, sliders, categories }) {
    return (
        <FrontLayout>
            <Head title="Kalidevi Store" />

            <div className="carousel w-full">
                {sliders.map(slider => (
                    <div id="item" className="carousel-item w-full" key={slider.id}>
                        <img src={slider.media[0]?.original_url} className="w-full" />
                    </div>

                ))}
            </div>

            <div className="container pt-16 pb-8">
                <h2 className="text-2xl font-medium text-orange-800 uppercase mb-6">Categories</h2>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
                    {categories.map((category, index) => {
                        return (
                            <div className="card bg-base-100 shadow-xl hover:bg-violet-600" key={index}>
                                <Link href={`/shop/category/${category.id}`} className="flex items-center px-6 py-3">
                                    <h2 className="card-title">{category.name}</h2>
                                </Link>
                            </div>

                        )
                    })}
                </div>
            </div>

            <div className="container pt-2 pb-16">
                <h2 className="text-2xl font-medium text-orange-800 uppercase mb-6">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {featuredProducts.map((featuredProduct, index) => {
                        return (
                            <ProductCard key={index} product={featuredProduct} />
                        )
                    })}
                </div>
            </div>

            <div className="container pb-16">
                <h2 className="text-2xl font-medium text-orange-800 uppercase mb-6">Top Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((product, index) => {
                        return (
                            <ProductCard key={index} product={product} />
                        )
                    })}
                </div>
            </div>

        </FrontLayout>

    );
}
