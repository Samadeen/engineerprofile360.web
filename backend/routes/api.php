<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;

// util functions
require_once "../util/sendResponse.php";

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
// middleware instance here
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// other route functions here
Route::get("/test", function(){
    // execute the function
    return sendResponse(false, 200, "Test case pass", null); 
});

Route::prefix("users")->group(function(){
    Route::get('verified/{userId}', [UserController::class, 'getVerifiedUserById']);
});