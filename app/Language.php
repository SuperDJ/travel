<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
	public function countries() {
		return $this->belongsToMany(Country::class);
	}
}
