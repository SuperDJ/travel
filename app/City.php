<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
	protected $guarded = ['id'];

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function country()
	{
    	return $this->belongsTo(Country::class);
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function airports()
	{
    	return $this->hasMany(Airport::class);
	}
}
