<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CityPolicy
{
    use HandlesAuthorization;

	public function index( User $user )
	{
		return $user->hasPermission( 'city.index' );
	}

	public function store( User $user )
	{
		return $user->hasPermission( 'city.store' );
	}

	public function edit( User $user )
	{
		return $user->hasPermission( 'city.edit' );
	}

	public function update( User $user )
	{
		return $user->hasPermission( 'city.update' );
	}

	public function destroy( User $user )
	{
		return $user->hasPermission( 'city.destroy' );
	}
}
