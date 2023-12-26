import FrontLayout from '@/Layouts/FrontLayout';
import { Link, Head } from '@inertiajs/react';
import ProductCard from '@/Pages/Components/ProductCard';
import { FaHeart, FaSearch } from 'react-icons/fa';

export default function Home({ products }) {
    return (
        <FrontLayout>
            <Head title="Kalidevi Store" />
            {/* <div className="container mx-auto">
                <div className="grid grid-cols-12">
                    <div className="col-span-3">
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
                    <div className='col-span-9'>
                        Slider
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div> */}
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
                    {products.map((product, index) => {
                        return (
                            <ProductCard key={index} product={product} />
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
