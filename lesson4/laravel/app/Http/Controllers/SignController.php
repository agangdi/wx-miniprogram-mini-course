<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Sign;
use App\Models\User;
use App\Utils\ResUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SignController extends Controller
{
    //
    public function index(Request $request) {
        $nickName = $request->get('nickName', '');
        $actName = $request->get('actName', '');
        $actId = intval($request->get('actId', ''));
        $page = intval($request->get('page', 1));
        $query = Sign::whereRaw('1 = 1');
        if(!empty($nickName)) {
            $query->where('nickName', $nickName);
        }
        if(!empty($actName)) {
            $act = DB::select('select id from activities where name like ?', ["%$actName%"]);
            $query->whereIn('act_id', array_column($act, 'id'));
        }
        if($actId) {
            $query->where('act_id', $actId);
        }
        $count = $query->count();
        $models = $query->offset( ($page -1) * 10)->limit(10)->get();
        foreach($models as $model) {
            $model->actName = Activity::fetchName($model->act_id);
            $model->nickName = User::fetchName($model->openid);
        }
        return ResUtil::ok([
            'count' => $count,
            'list' => $models->toArray()
        ]);
    }
}
