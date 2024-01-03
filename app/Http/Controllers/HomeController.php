<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Brand;
use App\Models\Category;
use App\Models\FilterProduct;
use App\Models\Product;
use App\Models\Filter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'products' => Product::with(['category', 'media'])->published()->get(),
            'featuredProducts' => Product::with(['category', 'media'])->featured()->get(),
            'categories' => Category::all(),
        ]);
    }

    public function shop(Category $category)
    {
        return Inertia::render('Shop', [
            'allProducts' => $category->products()->with(['category', 'brand', 'media'])->published()->get(),
            'categories' => Category::all(),
            'brands' => Brand::all(),
            'attributes' => Attribute::with('values')->get(),
            'category' => $category,
        ]);
    }

    public function show(Product $product)
    {
        $selectedAttributes = [];

        foreach ($product->attributes as $attribute) {
            $selectedAttributes[$attribute->name][] = [$attribute->pivot->attribute_value_id => $attribute->values()->where('id', $attribute->pivot->attribute_value_id)->first()->name];
        }
        return Inertia::render('ProductDetail', [
            'product' => $product->load('category', 'brand', 'media'),
            'attributes' => $product,
            'selectedAttributes' => $selectedAttributes
        ]);
    }

    public function filter(Category $category, Request $request)
    {

        $selectedAttributes = $request->all();
        $query = Product::query()->with(['media']);

        foreach ($selectedAttributes as $attributeId => $attributeValues) {
            $query->where(function ($subQuery) use ($attributeId, $attributeValues) {
                foreach (explode(',', $attributeValues) as $attributeValue) {
                    $subQuery->whereHas('attributes', function ($attributeSubQuery) use ($attributeId, $attributeValue) {
                        $attributeSubQuery->where('attribute_id', $attributeId)
                            ->where('attribute_value_id', $attributeValue);
                    });
                }
            });
        }

        return $query->published()->get();

        // return Product::with('category', 'brand', 'media')
        //     ->whereIn('id', $productIds)
        //     ->where('category_id', $category->id)
        //     ->get();
    }
}
