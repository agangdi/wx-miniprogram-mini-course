<?php

namespace App\Http\Controllers;

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
        return ResUtil::ok();
    }
}
