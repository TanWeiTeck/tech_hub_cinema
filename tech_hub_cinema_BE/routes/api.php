<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\SessionsController;
use App\Http\Controllers\mytableController;
use App\Http\Controllers\BookingListsController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('movies', MovieController::class);

Route::get('sessions/{id}', [SessionsController::class, 'index']);

Route::resource('sessions', SessionsController::class);

Route::get('confirmation/{sessionid}', [mytableController::class, 'index']);

Route::resource('confirmation', mytableController::class);

Route::resource('bookings', BookingListsController::class);