import FrontLayout from '@/Layouts/FrontLayout';
import { Head } from '@inertiajs/react';
import BreadCrumb from './Components/BreadCrumb';
import ProductCard from './Components/ProductCard';
import { useState } from 'react';
import Pagination from './Components/Pagination';

export default function Shop({ category, allProducts, attributes }) {

    const [params, setParams] = useState([]);
    const [products, setProducts] = useState(allProducts);


    function buildQueryString(params) {
        const filteredParams = {};

        for (const [key, value] of Object.entries(params)) {
            if (Array.isArray(value) && value.length > 0) {
                filteredParams[key] = Array.isArray(value) ? value.join(',') : value;
            }
        }

        const queryString = Object.entries(filteredParams)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');

        return queryString;
    }


    let tparams = {};


    function handleOptionChange(attributeId, optionId) {

        tparams = {
            ...params,
            [attributeId]: params[attributeId]
                ? params[attributeId].includes(optionId)
                    ? params[attributeId].filter(item => item !== optionId)
                    : [...params[attributeId], optionId]
                : [optionId]
        };
        const queryString = buildQueryString(tparams);

        fetch(`/shop/category/${category.id}/filter?${queryString}`)
            .then(res =>
                res.json()
            ).then(data => {
                setParams(tparams)
                setProducts(data)
            })
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
                                                onChange={() => handleOptionChange(attribute.id, option.id)}
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
                    <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                        {products.data && products.data.map((product) =>
                            <ProductCard product={product} key={product.id} />
                        )}
                    </div>
                    {
                        products.data && <Pagination links={products.links} />
                    }
                </div>
            </div>
        </FrontLayout>
    )
}
