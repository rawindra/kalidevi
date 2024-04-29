<?php

namespace App\Http\Controllers\Cart;

use App\Http\Controllers\Controller;
use App\Http\Requests\ManageCartRequest;
use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function viewCart(): Response
    {
        $cart_items = auth()->user()->cart;
        return Inertia::render('Cart', [
            'cart_items' => $cart_items,
        ]);
    }

    public function manageCart(Request $request)
    {
        $filter = json_encode($request->filter);
        $cart = Cart::updateOrCreate([
            'user_id' => auth()->id(),
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'filter' => $filter,
            "price" => $request->price
        ]);

        return redirect()->back();

    }

    public function deleteCart(Cart $cart)
    {
        $cart->delete();
        return redirect()->back();
    }

}
