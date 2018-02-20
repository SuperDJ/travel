<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
	protected $guarded = ['id'];

    public function continent() {
    	return $this->belongsTo(Continent::class);
	}

	public function states() {
    	return $this->hasMany(State::class);
	}

	public function currency() {
    	return $this->hasOne(Currency::class);
	}

	public function timezones() {
    	return $this->hasMany(Timezone::class);
	}
}
