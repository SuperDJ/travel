<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
	protected $guarded = ['id'];

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
	 */
	public function countries() {
		return $this->belongsToMany(Country::class);
	}

	public function users() {
		return $this->belongsToMany(User::class);
	}
}
