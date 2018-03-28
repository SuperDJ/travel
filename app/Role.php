<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends \Spatie\Permission\Models\Permission
{
    public $guarded = ['id'];

    public function permissions()
	{
		return $this->hasMany( Permission::class );
	}
}
