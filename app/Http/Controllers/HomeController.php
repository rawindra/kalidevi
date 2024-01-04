<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Brand;
use App\Models\Category;
use App\Models\FilterProduct;
use App\Models\Product;
use App\Models\Filter;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

        // $selectedFilterAttributeValues = [];
        // foreach ($selectedAttributes as $key => $value) {
        //     $selectedFilterAttributeValues = array_merge($selectedFilterAttributeValues, $value);
        // }

        // dd($selectedFilterAttributeValues);
        $productIds = [];

        $productQuery = Product::query();

        $productQuery->join('attribute_product as ap', 'products.id', '=', 'ap.product_id')
                    ->where(function ($query) use ($selectedAttributes) {
                        foreach ($selectedAttributes as $attributeId => $attributeValues) {
                            $query->orWhere(function ($query) use ($attributeId, $attributeValues) {
                                foreach ( explode(',',$attributeValues) as $value) {
                                    $query->where(function ($query) use ($attributeId, $value) {
                                        $query->where('ap.attribute_id', $attributeId)
                                            ->where('ap.attribute_value_id', $value);
                                    });
                                }
                            });
                        }
        });

        $distinctProductIds = $productQuery->distinct()->pluck('p.id');

        $productIds = $distinctProductIds;

        return $productIds;

        if (count($selectedAttributes) === 1) {
            
            $selectedFilterAttribute = array_keys($selectedAttributes)[0];
            $selectedFilterAttributeValues = $selectedAttributes[1];

            $explodedSelectedFilterAttributeValues = explode(',',$selectedFilterAttributeValues);
            $distinctProductIds = Product::select('products.id')
            ->join('attribute_product', 'products.id', '=', 'attribute_product.product_id')
            ->where('attribute_product.attribute_id', '=', $selectedFilterAttribute)
            ->whereIn('attribute_product.attribute_value_id', $explodedSelectedFilterAttributeValues)
            ->distinct('products.id')
            ->pluck('products.id');

            $productIds = $distinctProductIds;

        }

        if (count($selectedAttributes) > 1) {
            $mySelectedAttributes = [];
            $mySelectedAttributeValues = [];
            foreach ($selectedAttributes as $key => $value) {
                $mySelectedAttributes = array_merge($mySelectedAttributes, [$key]);
                $mySelectedAttributeValues = array_merge($mySelectedAttributeValues, [$value]);
            }
            
            $attrIdArray = $mySelectedAttributes;
            $attrValueArray = $mySelectedAttributeValues;

            $whereConditions = [];
            // for ($i = 0; $i < count($attrIdArray); $i++) {
                // foreach ($attrValueArray as $value) {
                //     $whereConditions[] = "(ap.attribute_id = $attrIdArray[$i] AND ap.attribute_value_id IN $value)";
                // }
            // }

            foreach ($selectedAttributes as $key => $value) {
                // $explodedValue = explode(',',$value);
                $whereConditions[] = "(ap.attribute_id = $key AND ap.attribute_value_id IN ($value))";
            }

            

            // dd($whereConditions);

            $query = DB::table('products as p')
                ->select('p.id')
                ->join('attribute_product as ap', 'p.id', '=', 'ap.product_id');

            $query->where(function ($query) use ($whereConditions, $attrIdArray, $attrValueArray) {
                for ($i = 0; $i < count($whereConditions); $i++) {
                    $query->orWhereRaw($whereConditions[$i], [$attrIdArray[$i], $attrValueArray[$i]]);
                }
            });

            $distinctProductIds = $query->distinct()->pluck('p.id');

            $productIds = $distinctProductIds;
            
        }

        return $productIds;

        return Product::with('category', 'brand', 'media')
            ->whereIn('id', $productIds)
            ->where('category_id', $category->id)
            ->get();
    }

    // public function getProductsByAttributes(Request $request)
    // {
    //     $selectedAttributes = $request->all();
    //     $mySelectedAttributes = [];
    //     $mySelectedAttributeValues = [];
    //     foreach ($selectedAttributes as $key => $value) {
    //         $mySelectedAttributes = array_merge($mySelectedAttributes, [$key]);
    //         $mySelectedAttributeValues = array_merge($mySelectedAttributeValues, [$value]);
    //     }
    //     // dd($mySelectedAttributes, $mySelectedAttributeValues);
    //     $attrIdArray = $mySelectedAttributes;
    //     $attrValueArray = $mySelectedAttributeValues;

    //     $whereConditions = [];
    //     for ($i = 0; $i < count($attrIdArray); $i++) {
    //         $whereConditions[] = "(ap.attribute_id = ? AND ap.attribute_value_id IN (?))";
    //     }

    //     $query = DB::table('products as p')
    //         ->select('p.name')
    //         ->join('attribute_product as ap', 'p.id', '=', 'ap.product_id');

    //     $query->where(function ($query) use ($whereConditions, $attrIdArray, $attrValueArray) {
    //         for ($i = 0; $i < count($whereConditions); $i++) {
    //             $query->orWhereRaw($whereConditions[$i], [$attrIdArray[$i], $attrValueArray[$i]]);
    //         }
    //     });

    //     $distinctNames = $query->distinct()->pluck('p.id');

    //     return $distinctNames;
    // }
}
