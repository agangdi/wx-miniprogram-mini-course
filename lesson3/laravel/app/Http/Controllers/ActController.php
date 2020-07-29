<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Activity;
use App\Utils\ResUtil;

class ActController extends Controller
{
    //
    public function index(Request $request) {
        $nickName = $request->get('name', '');
        $page = intval($request->get('page', 1));
        if(!empty($nickName)) {
            $qeury = Activity::where('nickName', $nickName);
        }else{
            $qeury = Activity::whereRaw('1 = 1');
        }
        $count = $qeury->count();
        $models = $qeury->offset( ($page -1) * 10)->limit(10)->get();
        return ResUtil::ok([
            'count' => $count,
            'list' => $models->toArray()
        ]);
    }
    public function edit(Request $request) {
        $id = $request->get('id', null);
        $name = $request->get('name', null);
        $sign_from = $request->get('sign_from', null);
        $sign_to = $request->get('sign_to', null);
        if(!$name || !$sign_from || !$sign_to) {
            return ResUtil::error('参数不正确');
        }

        if($id) {
            $model = Activity::find($id);
        }else{
            $model = new Activity();
        }
        if(!$model) {
            return ResUtil::error('数据不存在');
        }
        $model->fill([
            'name' => $name,
            'sign_from' => $sign_from,
            'sign_to' => $sign_to
        ]);
        $model->save();
        return ResUtil::ok();
    }

    public function del(Request $request) {
        $id = $request->get('id');
        if(empty($id)) {
            return ResUtil::error('参数不正确');
        }
        $model = Activity::find($id);
        if(!$model) {
            return ResUtil::error('数据不存在');
        }
        $model->delete();
        return ResUtil::ok();
    }
}
