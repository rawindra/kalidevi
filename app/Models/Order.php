<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public function orderItems()
    {
        return $this->hasMany(OrderedItems::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
