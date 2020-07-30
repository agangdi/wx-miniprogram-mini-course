<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('/great', function (Request $request) {
    sleep(1);
    return "Hello world from laravel";
});
/**
 * request data {code: ""}
 * response data {openid: ""}
 */
Route::post('/login', 'UserController@login');

Route::post('/admin/users', 'UserController@index');
Route::post('/admin/user/enable', 'UserController@enable');
Route::post('/admin/activities', 'ActController@index');
Route::post('/admin/activity/edit', 'ActController@edit');
Route::post('/admin/activity/del', 'ActController@del');
Route::post('/admin/sign/list', 'SignController@index');

Route::group(['middleware' => ['auth.openid']], function(){
    Route::post('/user/setInfo', 'UserController@setInfo');
    Route::post('/activities', 'ActController@activities');
    Route::post('/sign', 'UserController@sign');
});