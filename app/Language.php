<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
	protected $guarded = ['id'];

	public function countries() {
		return $this->belongsToMany(Country::class);
	}
}
