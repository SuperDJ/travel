<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class County extends Model
{
    public function state() {
    	return $this->belongsTo(State::class);
	}

	public function cities() {
    	return $this->hasMany(City::class);
	}
}
