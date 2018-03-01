<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected $guarded = ['id'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function language() {
    	return $this->hasOne(Language::class);
	}
}
