<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
	protected $guarded = ['id'];

    public function county() {
    	return $this->belongsTo(County::class);
	}

	public function airports() {
    	return $this->hasMany(Airport::class);
	}
}
