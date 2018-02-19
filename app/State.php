<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{
	protected $guarded = ['id'];

    public function country() {
    	return $this->belongsTo(Country::class);
	}

	public function counties() {
    	return $this->hasMany(County::class);
	}
}
