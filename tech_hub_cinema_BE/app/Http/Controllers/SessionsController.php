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
    public function index($id)
    {
        return DB::table('sessions')
        ->join('movies', 'sessions.movie_id', '=','movies.movie_id')
        ->select('sessions.*','movies.title')
        ->where('sessions.movie_id','=', $id)->get(); 
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
    public function store($request)
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\sessions  $sessions
     * @return \Illuminate\Http\Response
     */
    public function show(session $sessions)
    {

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
