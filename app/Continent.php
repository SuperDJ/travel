<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Continent extends Model
{
    public function countries() {
    	return $this->hasMany(Country::class);
	}
}
