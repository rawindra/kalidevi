<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Brand;
use App\Models\Cart;
use App\Models\Category;
use App\Models\FilterProduct;
use App\Models\Product;
use App\Models\Filter;
use App\Models\Order;
use App\Models\OrderedItems;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

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
            'product' => $product->load('category', 'brand', 'media', 'bulks'),
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
                foreach (explode(",", $attributeValues) as $attributeValue) {
                    $subQuery->whereHas('attributes', function ($attributeSubQuery) use ($attributeId, $attributeValue) {
                        $attributeSubQuery->where('attribute_id', $attributeId)
                            ->where('attribute_value_id', $attributeValue);
                    });
                }
            });
        }

        return $query->published()->get();
    }

    public function checkout(): Response
    {
        $cart_items = auth()->user()->cart;
        return Inertia::render('Checkout', [
            'cart_items' => $cart_items
        ]);
    }

    public function placeOrder(Request $request)
    {
        $order = new Order();
        $order->customer_name = $request->firstName . " " . $request->lastName;
        $order->customer_contact_number = $request->mobileNumber;
        $order->customer_address = $request->contactAddress;
        $order->order_date = now();
        $order->delivery_date = now();
        $order->order_status = 'pending';
        $order->save();
        foreach (auth()->user()->cart as $cartItem) {
            $orderedItems = new OrderedItems();
            $orderedItems->order_id = $order->id;
            $orderedItems->product_id = $cartItem->product_id;
            $orderedItems->quantity = $cartItem->quantity;
            $orderedItems->filter = $cartItem->filter;
            $orderedItems->price = $cartItem->price ? $cartItem->price : $cartItem->product->price * $cartItem->quantity;

            $orderedItems->save();
            $cartItem->delete();
        }


        return redirect()->route('home');
    }

    public function orders()
    {
        return Inertia::render('Order', [
            'orders' => Order::with(['orderItems.product.media'])->get()
        ]);
    }
}
