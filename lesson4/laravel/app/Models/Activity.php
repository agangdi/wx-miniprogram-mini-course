<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Activity
 * 
 * @property int|null $id
 * @property string|null $name
 * @property Carbon|null $sign_from
 * @property Carbon|null $sign_to
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @package App\Models
 */
class Activity extends Model
{
	protected $table = 'activities';

	protected $dates = [
		'sign_from',
		'sign_to'
	];

	protected $fillable = [
		'name',
		'sign_from',
		'sign_to'
	];

	public static function fetchName($id) {
		$model = self::find($id);
		return $model->name ?? '未知';
	}
}
