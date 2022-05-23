<?php

namespace App\Http\Controllers;

use App\Models\sessions;
use Illuminate\Http\Request;

use DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Str;
class mytableController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        
        $sessionid = $request->input('session_id',3);
        return DB::table('sessions')
        ->join('movies', 'sessions.movie_id', '=','movies.movie_id')
        ->select('sessions.date', 'sessions.time','movies.title')
        ->where('sessions.session_id','=', $sessionid)
        ->get(); 

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
        return response()->json([
            'sessions' =>$sessions
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\cr  $cr
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $sessionid = $request->input('session_id',1);
        return DB::table('sessions')
        ->join('movies', 'sessions.movie_id', '=','movies.movie_id')
        ->select('sessions.date', 'sessions.time','movies.title')
        ->where('sessions.session_id','=', $sessionid)
        ->get(); 
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\cr  $cr
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $sessionid = $request->input('session_id',1);
        return DB::table('sessions')
        ->join('movies', 'sessions.movie_id', '=','movies.movie_id')
        ->select('sessions.date', 'sessions.time','movies.title')
        ->where('sessions.session_id','=', $sessionid)
        ->get(); 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\cr  $cr
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, cr $cr)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\cr  $cr
     * @return \Illuminate\Http\Response
     */
    public function destroy(cr $cr)
    {
        //
    }
}
