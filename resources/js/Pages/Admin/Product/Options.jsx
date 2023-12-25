import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';

const Create = ({ filters, product }) => {

    let defaultSelectedOption = {}
    product.options.forEach((option) => {
        const filterId = String(option.pivot.filter_id);
        defaultSelectedOption[filterId] = option.pivot.options;
    })
    const [selectedOptions, setSelectedOptions] = useState(defaultSelectedOption || {});
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
        post(`/admin/products/${product.id}/options`)

    };

    return (
        <AuthenticatedLayout>
            <form onSubmit={submit}>
                {filters.map((filter, filterIndex) => (
                    <div className="form-control w-full max-w-xs" key={filterIndex}>
                        <label className="label cursor-pointer" key={filterIndex}>
                            <>
                                <span className="label-text font-bold text-white">
                                    <div>{filter.name}</div>
                                </span>
                            </>
                        </label>
                        {filter.options.map((option, optionIndex) => (
                            <label className="label cursor-pointer" key={optionIndex}>
                                <>
                                    <span className="label-text">{option}</span>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        onChange={() => handleOptionChange(filter.id, option)}
                                        defaultChecked={product.options.some(
                                            (productOption) =>
                                                productOption.id === filter.id &&
                                                productOption.pivot.options.includes(option)
                                        )}

                                    />
                                </>
                            </label>
                        ))}
                    </div>
                ))}
                <button className="btn mt-2 mb-2" disabled={processing}>
                    Create
                </button>
            </form>
        </AuthenticatedLayout>
    );
};

export default Create;
