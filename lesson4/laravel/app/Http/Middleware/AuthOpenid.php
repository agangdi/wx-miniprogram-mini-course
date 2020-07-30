<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Utils\ResUtil;
use Closure;

class AuthOpenid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $current = User::current();
        if(!$current) {
            return response()->json(ResUtil::error('请前往登录', -1));
        }
        if(!$current->enable()) {
            return response()->json(ResUtil::error('用户已经被封禁'));
        }
        return $next($request);
    }
}
