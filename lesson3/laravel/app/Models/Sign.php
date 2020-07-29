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
 *
 * @package App\Models
 */
class Sign extends Model
{
	protected $table = 'sign';

	protected $dates = [
		'signed_at'
	];

	protected $fillable = [
		'openid',
		'nickName',
		'signed_at'
	];
}
