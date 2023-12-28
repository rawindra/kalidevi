<?php

namespace App\Http\Controllers;

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
            'allProducts' => $category->products()->with(['category', 'brand', 'options', 'media'])->published()->get(),
            'categories' => Category::all(),
            'brands' => Brand::all(),
            'filters' => Filter::all(),
            'category' => $category,
        ]);
    }

    public function show(Product $product)
    {
        return Inertia::render('ProductDetail', [
            'product' => $product->load('category', 'brand', 'media', 'options'),
        ]);
    }

    public function filter(Category $category, Request $request)
    {

        $options = array_keys($request->all());
        $products = $category->products()
            ->with(['options' => function ($query) use ($options) {
                // dd($query->options);
                $query->whereJsonContains('options', $options)->first();
            }])
            ->get();
        dd($products);
        dump($options);
        $productIds = FilterProduct::whereJsonContains('options', $options)->get()->pluck('product_id');
        dd($productIds);
        return Product::with('category', 'brand', 'media', 'options')->whereIn('id', $productIds)->where('category_id', $category->id)->get();
    }
}
