<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\Pivot;

class FilterProduct extends Pivot
{
    protected $guarded = [];

    protected $cast = [
        'options' => 'json'
    ];

    protected function options(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => json_decode($value, true),
        );
    }
}