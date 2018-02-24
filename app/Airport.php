<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Airport extends Model
{
    protected $guarded = ['id'];

    function city() {
    	return $this->belongsTo(City::class);
	}
}
