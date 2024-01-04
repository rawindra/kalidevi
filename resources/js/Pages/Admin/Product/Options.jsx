import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';

const Create = ({ attributes, product, selectedAttributes }) => {

    const [selectedOptions, setSelectedOptions] = useState(selectedAttributes || {});
    const { data, post, processing, errors } = useForm({});

    const handleOptionChange = (filterId, option) => {
        const currentOptions = selectedOptions[filterId] || [];
        const updatedOptions = currentOptions.includes(option)
            ? currentOptions.filter(selectedOption => selectedOption !== option)
            : [...currentOptions, option];

        setSelectedOptions({ ...selectedOptions, [filterId]: updatedOptions });
    };

    const submit = async (e) => {
        e.preventDefault();
        data.options = selectedOptions;
        post(`/admin/products/${product.id}/attributes`)

    };

    return (
        <AuthenticatedLayout>
            <form onSubmit={submit}>
                {attributes.map((attribute, attributeIndex) => (
                    <div className="form-control w-full max-w-xs" key={attributeIndex}>
                        <label className="label cursor-pointer" key={attributeIndex}>
                            <>
                                <span className="label-text font-bold text-orange-500">
                                    <div>{attribute.name}</div>
                                </span>
                            </>
                        </label>
                        {attribute.values?.map((value, valueIndex) => (
                            <label className="label cursor-pointer" key={valueIndex}>
                                <>
                                    <span className="label-text">{value.name}</span>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        onChange={() => handleOptionChange(attribute.id, value.id)}
                                        defaultChecked={selectedAttributes[attribute?.id]?.some(
                                            (option) => option === value.id
                                        )}

                                    />
                                </>
                            </label>
                        ))}
                    </div>
                ))}
                <button className="bg-blue-500 hover:bg-blue-700 text-white btn mt-2 mb-2" disabled={processing}>
                    Create
                </button>
            </form>
        </AuthenticatedLayout>
    );
};

export default Create;
