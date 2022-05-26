<?php

namespace App\Http\Controllers;

use App\Models\BookingLists;
use Illuminate\Http\Request;

use DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Str;

class BookingListsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('booking_lists')->get();
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

    
    public function store(Request $request)
    {
        $request->validate([
            
            'name'=> 'required',
            'email'=> 'required',
            'title'=> 'required',
            'date'=> 'required',
            'time'=> 'required',
            'session_id'=> 'required',
            
        ]);
        
        try{
            BookingLists::create($request->post());

            
            return response()->json([
                'message'=>'Booking Made Successfully!!'
            ]);
        } catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while making a booking!!'
            ],500);
        } 
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Booking  $booking
     * @return \Illuminate\Http\Response
     */
    public function show(BookingLists $bookinglists)
    {
        return response()->json([
            'bookinglists'=>$bookinglists
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Booking  $booking
     * @return \Illuminate\Http\Response
     */
    public function edit(Booking $booking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Booking  $booking
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BookingLists $bookinglists)
    {
        $request->validate([
            'title'=> 'required',
            'date'=> 'required',
            'time'=> 'required',
            'name'=> 'required',
            'email'=> 'required',
            'session_id'=> 'required',
            
        ]);

        $bookinglists->fill($request->post())->update();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Booking  $booking
     * @return \Illuminate\Http\Response
     */
    public function destroy(BookingLists $bookinglists)
    {
        try {
            $bookinglists->delete();

            return response()->json([
                'message'=>'Booking deleted successfully'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a product!!'
            ]);
        }
    }
}

