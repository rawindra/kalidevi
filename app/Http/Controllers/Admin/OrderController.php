<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Order/Index',[
            'orders' => Order::get()
        ]);
    }

    public function show(Order $order)
    {
        return Inertia::render('Admin/Order/Show',[
            'orderItems' => $order->orderItems->load('product')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return back();
    }

    public function changeStatus(Order $order)
    {
        $order->order_status = match ($order->order_status) {
             'pending'=> 'purchased',
             'purchased'=> 'cancelled',
             'cancelled'=> 'pending',
        };

        $order->save();

        return back();
    }
}
