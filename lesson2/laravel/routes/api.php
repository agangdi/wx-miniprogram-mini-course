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
Route::post('/login', function (Request $request) {
    $code = $request->get('code');
    $url = 'https://api.weixin.qq.com/sns/jscode2session';
    $param = [
        'appid' => env("WX_APPID", ''),
        'secret' => env('WX_SECRET', ''),
        'js_code' => $code,
        'grant_type' => 'authorization_code'
    ];
    // appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
    $url .= '?' . http_build_query($param);
    $res = file_get_contents($url);
    $res = json_decode($res, true);
    if(!empty($res['openid'])){
        return [
            'code' => 0, 
            'data' => [
                'openid' => $res['openid']
            ],
            'msg' => 'success'
        ];
    }else{
        return [
            'code' => -3, 
            'data' => [],
            'msg' => 'wrong code'
        ];
    }
});