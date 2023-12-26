<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWishlistRequest;
use App\Http\Requests\UpdateWishlistRequest;
use App\Models\Product;
use App\Models\Wishlist;
use Inertia\Inertia;
use Inertia\Response;

class WishlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : Response
    {
        $wishlist = auth()->user()->wishlist->load(['product.media']);
        return Inertia::render('Wishlist', [
            'wishlist' => $wishlist,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWishlistRequest $request)
    {
        $wishlist = Wishlist::updateOrCreate([
            'user_id' => auth()->id(),
            'product_id' => $request->product_id
        ]);
        // $wishlist->save();
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wishlist $wishlist)
    {
        $wishlist->delete();
        return redirect()->back();
    }
}
