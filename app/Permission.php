<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    public $guarded = ['id'];

    public function roles()
	{
		return $this->belongsToMany( Role::class );
	}
}
