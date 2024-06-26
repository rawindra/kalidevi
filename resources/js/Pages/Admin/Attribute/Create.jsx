import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create() {
    const [inputValues, setInputValues] = useState(['']);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        values: '',
    })

    function submit(e) {
        e.preventDefault()
        data.values = inputValues;

        post('/admin/attributes');
    }

    const handleAddMore = () => {
        setInputValues([...inputValues, '']);
    };

    const handleRemove = (index) => {
        const newInputValues = [...inputValues];
        newInputValues.splice(index, 1);
        setInputValues(newInputValues);
    };

    const handleInputChange = (index, value) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);
    };

    return (
        <AuthenticatedLayout
        >
            <Head title="Create Filter" />
            <form onSubmit={submit}>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Name</span>
                    </div>
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.name && <span className='text-red-500'>{errors.name}</span>}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Values</span>
                    </div>
                </label>
                {inputValues.map((value, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            className="input input-bordered w-full mb-2 me-2 max-w-xs"
                            value={value}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                        {inputValues.length > 1 && (
                            <button type="button" className='text-white btn btn-error btn-xs' onClick={() => handleRemove(index)}>
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                {errors.values && <span className='text-red-500'>{errors.values}</span>}

                <button type="button" className="bg-yellow-500 hover:bg-blue-700 text-white btn btn-xs" onClick={handleAddMore}>
                    Add More
                </button>
                <br />
                <button className="bg-blue-500 hover:bg-blue-700 text-white btn mt-4 mb-2" disabled={processing}>Create</button>
            </form>
        </AuthenticatedLayout>
    )
}