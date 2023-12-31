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
        // dd($request->all());

        $selectedAttributes = $request->all();

        // $query = \DB::table('products as p')
        //     ->select('p.id', 'p.name');
        $query = \DB::table('products as p');
        foreach ($selectedAttributes as $attribute => $options) {
            $optionsArray = explode(',', $options);

            // $query->join('attribute_product as pa', function ($join) use ($attribute, $optionsArray) {
            //     $join->on('p.id', '=', 'pa.product_id');

            //     $join->where('pa.attribute_id', '=', $attribute);

            //     $join->whereIn('pa.attribute_value_id', $optionsArray);

            // });

            $query->join('attribute_product as ap', 'p.id', '=', 'ap.product_id')
                ->select('p.name')
                ->distinct()
                ->where('ap.attribute_id', $attribute)
                ->whereIn('ap.attribute_value_id', $optionsArray);
        }

        $results = $query->distinct()->get();

        return $results;

        // $productIds = [];
        // return Product::with('category', 'brand', 'media')
        //     ->whereIn('id', $productIds)
        //     ->where('category_id', $category->id)
        //     ->get();
    }
}
