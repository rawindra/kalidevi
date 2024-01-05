<?php

use App\Models\Cart;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->dateTime('order_date')->nullable()->default(now());
            $table->dateTime('delivery_date')->nullable();
            $table->enum('order_status', ['pending', 'purchased', 'cancelled'])->nullable()->default('pending');
            $table->enum('payment_status', ['unpaid', 'paid', 'credit-remaining'])->nullable()->default('unpaid');
            $table->string('customer_name');
            $table->string('customer_contact_number');
            $table->string('customer_address')->nullable();
            $table->longText('order_note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
