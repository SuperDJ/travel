<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Timezone extends Model
{
	protected $guarded = ['id'];

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function country()
	{
    	return $this->belongsTo( Country::class );
	}
}
