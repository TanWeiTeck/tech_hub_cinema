<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingLists extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'title',
        'date',
        'time',
        'session_id',
    ];

    protected $primaryKey = 'booking_id';
}