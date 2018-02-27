<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Continent extends Model
{
	protected $guarded = ['id'];

    public function countries() {
    	return $this->hasMany(Country::class);
	}

	public function cities() {
    	return $this->hasManyThrough(City::class, Country::class);
	}
}
