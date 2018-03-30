<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    public $guarded = ['id'];

    public function permissions()
	{
		return $this->hasMany( Permission::class );
	}

	public function users()
	{
		return $this->belongsToMany( User::class );
	}
}
