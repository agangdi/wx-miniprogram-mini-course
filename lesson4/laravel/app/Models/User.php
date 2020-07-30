<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class User
 * 
 * @property int|null $id
 * @property string|null $openid
 * @property string|null $nickName
 * @property string|null $avatarUrl
 * @property int|null $stat
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @package App\Models
 */
class User extends Model
{
	protected $table = 'users';

	protected $casts = [
		'stat' => 'int'
	];

	protected $fillable = [
		'openid',
		'nickName',
		'avatarUrl',
		'stat'
	];

	public static $current=null;

	public static function current() {
		if(!static::$current) {
			// X-OPENID
			$openid = $_SERVER['HTTP_X_OPENID'] ?? null;
			if(!$openid) {
				return null;
			}
			$current = self::where('openid', $openid)->first();
		 }
		 return $current;
	}

	/**
	 * @return self
	 */
	public static function fetchWithOpenid($openid)
	{
			return self::where('openid', $openid)->first();
	}

	public function enable() {
		return $this->stat == 1;
	}
	public static function fetchName($openid) {
		$model = self::fetchWithOpenid($openid);
		return $model->nickName ?? '未知';
	}

}
