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

Route::get('/', 'Auth\LoginController@login');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::prefix('messages')->group(function(){
    Route::resource('/', 'MessageController');
    Route::get('/all', 'MessageController@all')->name('all_messages');
});

Route::get('/notification', 'NotificationController@index')->name('notification');

