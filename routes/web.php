<?php

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

Route::get('/', 'MessageController@index');

Auth::routes();

Route::prefix('messages')->group(function(){
    Route::resource('/', 'MessageController');
    Route::get('/all', 'MessageController@all')->name('all_messages');
});
