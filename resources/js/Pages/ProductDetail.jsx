import React from 'react'

const ProductDetail = ({ product }) => {
    return (
        <div class="container mx-auto my-8 p-8 bg-white shadow-md rounded-md">
            <div class="grid grid-cols-2 gap-8">
                <div class="col-span-1">
                    <img src="product-image.jpg" alt="Product Image" class="w-full h-auto rounded-md shadow-md" />
                </div>

                <div class="col-span-1">
                    <h1 class="text-3xl font-semibold mb-4">{product.name}</h1>
                    <p class="text-gray-700 mb-4">{product.category.name} | {product.category.brand}</p>
                    <p class="text-xl text-blue-500 font-semibold mb-4">Rs. {product.price}</p>

                    <div class="mb-4">
                        <label for="color" class="text-gray-600">Color:</label>
                        <select id="color" name="color"
                            class="block w-full p-2 border rounded-md bg-white focus:outline-none focus:ring focus:border-blue-300">
                            <option value="blue">Blue</option>
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label for="size" class="text-gray-600">Size:</label>
                        <select id="size" name="size"
                            class="block w-full p-2 border rounded-md bg-white focus:outline-none focus:ring focus:border-blue-300">
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>

                    <button
                        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                        Add to Cart
                    </button>
                </div>
            </div>

            <div class="mt-8">
                <h2 class="text-2xl font-semibold mb-4">Product Description</h2>
                <p class="text-gray-700">{product.description}</p>
            </div>
        </div>
    )
}

export default ProductDetail