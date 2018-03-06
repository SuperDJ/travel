<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
	protected $guarded = ['id'];

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function continent()
	{
    	return $this->belongsTo(Continent::class);
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function cities()
	{
    	return $this->hasMany(City::class);
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function currency()
	{
    	return $this->hasOne(Currency::class);
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function timezones()
	{
    	return $this->hasMany(Timezone::class);
	}
}
