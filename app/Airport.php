<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Airport extends Model
{
    protected $guarded = ['id'];

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	function city() {
    	return $this->belongsTo(City::class);
	}
}
