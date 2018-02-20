<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
	protected $guarded = ['id'];

    public function countries() {
    	return $this->belongsToMany(Country::class);
	}
}
