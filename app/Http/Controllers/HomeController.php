<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'products' => Product::with(['category', 'media'])->published()->get(),
        ]);
    }

    public function shop()
    {
        return Inertia::render('Shop', [
            'products' => Product::with(['category', 'media'])->published()->get(),
            'categories' => Category::all(),
            'brands' => Brand::all(),
        ]);
    }

    public function show(Product $product)
    {
        return Inertia::render('Product', [
            'product' => $product->load('category', 'brand', 'media'),
        ]);
    }
}
