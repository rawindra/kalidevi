<?php

use App\Http\Controllers\Admin\AttributeController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Cart\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WishlistController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/shop/category/{category}', [HomeController::class, 'shop'])->name('shop');
Route::get('/shop/category/{category}/filter', [HomeController::class, 'filter'])->name('shop.filter');
Route::get('/products/{product}', [HomeController::class, 'show'])->name('products.show');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/cart', [CartController::class, 'viewCart'])->name('cart.view');
    Route::post('/cart', [CartController::class, 'manageCart'])->name('cart.manage');
    Route::delete('/cart/{cart}', [CartController::class, 'deleteCart'])->name('cart.delete');
    Route::resource('wishlist', WishlistController::class)->only(['index', 'store', 'destroy']);
    Route::get('/checkout',[HomeController::class, 'checkout'])->name('checkout');
    Route::post('/checkout',[HomeController::class, 'placeOrder'])->name('checkout.post');

    Route::prefix('admin')->as('admin.')->group(function () {
        Route::resource('brands', BrandController::class);
        Route::resource('categories', CategoryController::class);
        Route::resource('products', ProductController::class);
        Route::get('products/{product}/attributes', [ProductController::class, 'createAttributes'])->name('products.attributes.create');
        Route::post('products/{product}/attributes', [ProductController::class, 'storeAttributes'])->name('products.attributes.store');
        Route::resource('attributes', AttributeController::class);
        Route::resource('orders', OrderController::class);
    });
});

require __DIR__ . '/auth.php';
