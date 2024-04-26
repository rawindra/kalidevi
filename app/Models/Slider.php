<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;

class Slider extends Model
{
    use HasFactory;
    use InteractsWithMedia;
    
    protected $guarded = [];
}
