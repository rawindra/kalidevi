<?php

namespace App\Http\Controllers\Cart;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function viewCart() //: Response
    {
        $cart_items = auth()->user()->cart;
        return Inertia::render('Cart', [
            'cart_items' => $cart_items,
        ]);
    }
}
