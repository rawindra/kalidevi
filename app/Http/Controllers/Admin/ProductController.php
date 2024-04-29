<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\Filter;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Product/Index', [
            'products' => Product::with(['category', 'brand', 'media'])->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Product/Create', [
            'categories' => Category::all(),
            'brands' => Brand::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:products,name',
            'description' => 'nullable',
            'price' => 'required|decimal:0,2',
            'category_id' => 'required',
            'brand_id' => 'required',
            'featured' => 'nullable',
            'published' => 'nullable',
            'stock' => 'required|integer',
        ]);

        $product = Product::create($validated);
        $product->bulks()->createMany($request->bulks);

        if ($request->hasFile('image')) {
            $product->addMediaFromRequest('image')->toMediaCollection('images');
        }

        return redirect()->route('admin.products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Admin/Product/Edit', [
            'product' => $product,
            'categories' => Category::all(),
            'brands' => Brand::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('products', 'name')->ignore($product->id)],
            'description' => 'nullable',
            'price' => 'required|decimal:0,2',
            'category_id' => 'required',
            'brand_id' => 'required',
            'featured' => 'nullable',
            'published' => 'nullable',
            'stock' => 'required|integer',
        ]);

        $product->update($validated);

        $product->bulks()->delete();
        $product->bulks()->createMany($request->bulks);

        if ($request->hasFile('image')) {
            $product->clearMediaCollection('images');
            $product->addMediaFromRequest('image')->toMediaCollection('images');
        }


        return redirect()->route('admin.products.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('admin.products.index');
    }

    public function createAttributes(Product $product)
    {
        $selectedAttributes = [];

        foreach ($product->attributes as $attribute) {
            $selectedAttributes[$attribute->id][] = $attribute->pivot->attribute_value_id;
        }
        return Inertia::render('Admin/Product/Options', [
            'product' => $product,
            'attributes' => Attribute::with('values')->get(),
            'selectedAttributes' => $selectedAttributes
        ]);
    }

    public function storeAttributes(Request $request, Product $product)
    {
        $product->attributes()->detach();
        foreach ($request->options as $attributeId => $valueIds) {
            foreach ($valueIds as $valueId) {
                $product->attributes()->attach($attributeId, ['attribute_value_id' => $valueId]);
            }

        }

        return redirect()->route('admin.products.index');
    }
}
