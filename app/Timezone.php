<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Timezone extends Model
{
	protected $guarded = ['id'];

    public function countries() {
    	return $this->belongsToMany(Country::class);
	}
}
