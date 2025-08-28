<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserAuthController;

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



// Route::get('/loginUser' , [UserAuthController::class ,'loginUser']);

// Login
Route::get('/loginUser/{email}/{password}' , [UserAuthController::class ,'loginUser']);
// Register
Route::post('/registerPersonnel' , [UserAuthController::class ,'registerPersonnel']);
// Load Role
Route::get('/loadRole' , [RoleController::class ,'loadRole']);
// Role Table - User / Admin
Route::get('/tableRole' , [RoleController::class , 'tableRole']);
// update - edit 
Route::post('/updateUserTable' , [UserAuthController::class ,'updateUserTable']);
// softDelete Homepage - 
Route::post('/softDeleteTableRecord' , [UserAuthController::class ,'softDeleteTableRecord']);
