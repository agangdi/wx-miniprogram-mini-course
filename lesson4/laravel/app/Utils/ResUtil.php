<?php

namespace App\Utils;

use stdClass;

class ResUtil
{

    const PAGENATION = 10;

    public static function error($msg="", $code=-3, $data=null){
        if (!$data) $data = new stdClass;
        return [
            'code' => $code,
            'data' => $data,
            'msg' => $msg
        ];
    }

    public static function ok($data=null, $msg='成功', $code=0)
    {
        if (!$data) $data = new stdClass;
        return [
            'code' => $code,
            'data' => $data,
            'msg' => $msg
        ];
    }
}