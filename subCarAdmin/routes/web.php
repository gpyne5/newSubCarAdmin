<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Cors;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Route::resource('admin', AdminController::class);
Route::post('admin', [AdminController::class, 'store'])
    ->middleware(Cors::class);
Route::get('admin', [AdminController::class, 'index'])
    ->middleware(Cors::class);

Route::put('admin/{admin}', [AdminController::class, 'update'])
    ->middleware(Cors::class);
Route::delete('admin/{admin}', [AdminController::class, 'destroy'])
    ->middleware(Cors::class);
