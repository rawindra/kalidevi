<?php

namespace App\Enums;

enum PaymentStatus : string {
    case UNPAID = 'unpaid';
    case PAID = 'paid';
    case CREDIT_REMAINING = 'credit-remaining';
}