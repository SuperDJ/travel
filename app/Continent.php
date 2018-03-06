<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Continent extends Model
{
	protected $guarded = ['id'];

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function countries()
	{
    	return $this->hasMany(Country::class);
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
	 */
	public function cities()
	{
    	return $this->hasManyThrough(City::class, Country::class);
	}
}
