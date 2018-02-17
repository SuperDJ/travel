<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    public function continent() {
    	return $this->belongsTo(Continent::class);
	}

	public function states() {
    	return $this->hasMany(State::class);
	}
}
