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
}
