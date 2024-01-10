<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderedItems extends Model
{
    use HasFactory;

    protected $casts = [
        'filter' => 'array'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
