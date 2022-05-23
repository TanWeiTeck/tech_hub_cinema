<?php

namespace App\Http\Controllers;

use DB;
use App\Models\Movie;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Str;

class MovieController extends Controller
{

    public function index()
    {
        return DB::table('movies')->get();
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }


    public function show(Movie $movie)
    {
        //
    }

    public function edit(Movie $movie)
    {
        //
    }

    public function update(Request $request, Movie $movie)
    {
        //
    }

    public function destroy(Movie $movie)
    {
        //
    }
}
