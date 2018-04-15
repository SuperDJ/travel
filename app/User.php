<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    protected $guarded = ['id'];

    protected $casts = [
    	'roles' => 'array'
	];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token', 'api_token'];

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function profile()
	{
		return $this->hasOne( Profile::class );
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
	 */
	public function roles()
	{
		return $this->belongsToMany( Role::class );
	}

	/**
	 * Check if user has a role
	 *
	 * @param string $role
	 *
	 * @return bool
	 */
	public function hasRole( string $role )
	{
		return count( $this->roles()->where( 'name', $role )->first() ) > 0;
	}

	// Check if user has a permission
	public function hasPermission( string $permission )
	{
		$permissions = [];
		foreach( $this->roles as $role )
		{
			foreach( $role->permissions as $permission )
			{
				$permissions[] = $permission['name'];
			}
		}

		return in_array( $permission, $permissions );
	}
}
