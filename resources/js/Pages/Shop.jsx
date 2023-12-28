import FrontLayout from '@/Layouts/FrontLayout';
import { Head, useForm } from '@inertiajs/react';
import BreadCrumb from './Components/BreadCrumb';
import ProductCard from './Components/ProductCard';
import { useState } from 'react';

export default function Shop({ category, allProducts, attributes }) {

    const [products, setProducts] = useState(allProducts);

    function handleOptionChange(option) {
        const currentParams = new URLSearchParams(window.location.search);

        // Toggle the option in the URL parameters
        if (currentParams.has(option)) {
            currentParams.delete(option);
        } else {
            currentParams.append(option, true);
        }

        // Update the component state with the new URL parameters
        window.history.replaceState({}, '', `${window.location.pathname}?${currentParams.toString()}`);

        fetch(`/shop/category/${category.id}/filter${window.location.search}`).then(res =>
            res.json()
        ).then(data => setProducts(data))
    }

    return (
        <FrontLayout>
            <Head title="Shop" />
            <BreadCrumb title="Shop" />
            <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
                <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
                    <div className="divide-y divide-gray-200 space-y-5">
                        {attributes.map((attribute, index) =>
                            <div className="pt-4" key={index}>
                                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">{attribute.name}</h3>
                                {attribute.values.map((option, index) =>
                                    <div className="space-y-2" key={index}>
                                        <div className="flex items-center">
                                            <input type="checkbox" name="brand-1" id="brand-1"
                                                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                                onChange={() => handleOptionChange(option)}
                                                defaultChecked={window.location.search.includes(option)}
                                            />
                                            <label htmlFor="brand-1" className="text-gray-600 ml-3 cusror-pointer">{option.name}</label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="flex items-center mb-4">
                        <select name="sort" id="sort"
                            className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary">
                            <option value="">Default sorting</option>
                            <option value="price-low-to-high">Price low to high</option>
                            <option value="price-high-to-low">Price high to low</option>
                            <option value="latest">Latest product</option>
                        </select>
                    </div>

                    <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                        {products && products.map((product) =>
                            <ProductCard product={product} key={product.id} />
                        )}
                    </div>
                </div>
            </div>
        </FrontLayout>
    )
}
