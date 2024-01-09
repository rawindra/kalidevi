<?php

namespace App\Enums;

enum OrderStatus: string {
    case PENDING =  'pending';
    case PURCHASED = 'purchased';
    case CANCELLED = 'cancelled';
}