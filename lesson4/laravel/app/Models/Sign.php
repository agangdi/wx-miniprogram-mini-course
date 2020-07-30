<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Sign
 * 
 * @property int|null $id
 * @property string|null $openid
 * @property string|null $nickName
 * @property Carbon $signed_at
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property int|null $act_id
 *
 * @package App\Models
 */
class Sign extends Model
{
	protected $table = 'sign';

	protected $casts = [
		'act_id' => 'int'
	];

	protected $dates = [
		'signed_at'
	];

	protected $fillable = [
		'openid',
		'nickName',
		'signed_at',
		'act_id',
		'lng',
		'lat',
		'location'
	];

	public static function signed($openid, $act_id)
	{
		return self::where('openid', $openid)->where('act_id', $act_id)->exists();
	}

	public function act() 
	{
		return $this->hasOne(Activity::class, 'id', 'act_id');
	}
}
