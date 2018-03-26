<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $guarded = ['id'];

    protected $casts = ['routes' => 'array'];

    public function user()
	{
		return $this->belongsTo( User::class );
	}
}
