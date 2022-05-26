<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sessions extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'time',
        'name',
        'email',
        'movie_id'
    ];

    public function movies()
    {
        return $this->belongsTo('App\Models\Movie', 'movie_id');
    }
}
