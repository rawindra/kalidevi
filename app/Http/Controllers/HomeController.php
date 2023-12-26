<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
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
            'products' => $category->products()->with(['category', 'brand', 'options', 'media'])->published()->get(),
            'categories' => Category::all(),
            'brands' => Brand::all(),
            'filters' => Filter::all(),
        ]);
    }

    public function show(Product $product)
    {
        return Inertia::render('ProductDetail', [
            'product' => $product->load('category', 'brand', 'media', 'options'),
        ]);
    }
}
