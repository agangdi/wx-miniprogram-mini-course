<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Sign;
use App\Models\User;
use App\Utils\ResUtil;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function index(Request $request) {
        $nickName = $request->get('nickName', '');
        $page = intval($request->get('page', 1));
        if(!empty($nickName)) {
            // select * from users where nickName = {$nickName}
            $qeury = User::where('nickName', $nickName);
        }else{
            $qeury = User::whereRaw('1 = 1');
        }
        $count = $qeury->count();
        $models = $qeury->offset( ($page -1) * 10)->limit(10)->get();

        return ResUtil::ok([
            'count' => $count,
            'list' => $models->toArray()
        ]);
    }

    public function enable(Request $request) {
        $id = $request->get('id');
        $action = $request->get('action', 1);
        if(empty($id) || !in_array($action, [1, 2])) {
            return ResUtil::error('参数不正确');
        }
        $user = User::find($id);
        if(!$user) {
            return ResUtil::error('用户不存在');
        }
        $user->stat = $action;
        $user->save();
        return ResUtil::ok();
    }

    public function login(Request $request) {
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
            // 创建用户
            $user = User::fetchWithOpenid($res['openid']);
            if(!$user) {
                $user = new User();
                $user->fill([
                    'nickName' => '',
                    'avatarUrl' => '',
                    'stat' => 1,
                    'openid' => $res['openid']
                ]);
                $user->save();
            }
            return [
                'code' => 0, 
                'data' => [
                    'openid' => $res['openid'],
                    'nickName' => $user->nickName,
                    'avatarUrl' => $user->avatarUrl
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
    }

    public function setInfo(Request $request) {
        $nickName = $request->get('nickName');
        $avatarUrl = $request->get('avatarUrl');
        if(empty($nickName) || empty($avatarUrl)) {
            return ResUtil::error('参数不正确');
        }
        $user = User::current();
        $user->fill([
            'nickName' => $nickName,
            'avatarUrl' => $avatarUrl
        ]);
        $user->save();
        return ResUtil::ok();
    }

    public function sign(Request $request) {
        $id = $request->get('id');
        $lng = $request->get('lng');
        $lat = $request->get('lat');
        $location = $request->get('location');
        if(!is_numeric($id)) {
            return ResUtil::error('参数不正确');
        }
        $act = Activity::find($id);
        $now = date('Y-m-d H:i:s');
        if(!$act || ($act->sign_from > $now || $act->sign_to < $now)) {
            return ResUtil::error('活动不存在或尚未开启签到');
        }
        $user = User::current();
        if(Sign::signed($user->openid, $id)){
            return ResUtil::error('无需重复签到');
        }
        Sign::create([
            'openid' => $user->openid,
            'act_id' => $id,
            'nickName' => $user->nickName,
            'signed_at' => date('Y-m-d H:i:s'),
            'lng' => $lng,
            'lat' => $lat,
            'location' => $location
        ]);
        return ResUtil::ok();
    }
}
