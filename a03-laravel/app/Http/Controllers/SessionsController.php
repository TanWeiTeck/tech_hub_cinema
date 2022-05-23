<?php

namespace App\Http\Controllers;

use DB;
use App\Models\sessions;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Str;

class SessionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('sessions')
        ->join('movies', 'sessions.movie_id', '=','movies.movie_id')
        ->select('sessions.*','movies.title')
        //->where('sessions.movie_id')
        ->get(); 
/*
        return DB::table('sessions')
        //->join('movies', 'sessions.movie_id', '=','movies.movie_id')
        ->select(DB::raw("SELECT * FROM sessions JOIN movies on sessions.movie_id = movies.movie_id WHERE movies.movie_id = ?", [$movies.movie_id]))
        ->get(); */
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\sessions  $sessions
     * @return \Illuminate\Http\Response
     */
    public function show(sessions $sessions)
    {
        //return DB::select('select * from sessions where movie_id = ?',[$sessions]);
        try {
            $movie = Movie::with('sessions')->where ('movie_id',$id)->firstorFail();
        }
        catch(ModelNotFoundException $exception)
        {
            abort(404);
        }
        return view('movies.show')->withMovie($movie);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\sessions  $sessions
     * @return \Illuminate\Http\Response
     */
    public function edit(sessions $sessions)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\sessions  $sessions
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, sessions $sessions)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\sessions  $sessions
     * @return \Illuminate\Http\Response
     */
    public function destroy(sessions $sessions)
    {
        //
    }
}
