import FrontLayout from '@/Layouts/FrontLayout';
import ProductCard from '@/Pages/Components/ProductCard';
import { Head } from '@inertiajs/react';

export default function Home({ products, featuredProducts }) {
    return (
        <FrontLayout>
            <Head title="Kalidevi Store" />
            <div className="bg-cover bg-no-repeat bg-center py-36" style={{ backgroundImage: 'url(assets/images/banner-bg.jpg)' }}>
                <div className="container">
                    <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
                        best collection for <br /> home decoration
                    </h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam <br />
                        accusantium perspiciatis, sapiente
                        magni eos dolorum ex quos dolores odio</p>
                    <div className="mt-12">
                        <a href="#" className="bg-primary border border-primary text-white px-8 py-3 font-medium 
                            rounded-md hover:bg-transparent hover:text-primary">Shop Now</a>
                    </div>
                </div>
            </div>

            <div className="container pt-16 pb-16">
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
