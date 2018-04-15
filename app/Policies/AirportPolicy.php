<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AirportPolicy
{
    use HandlesAuthorization;

	public function index( User $user )
	{
		return $user->hasPermission( 'airport.index' );
	}

	public function store( User $user )
	{
		return $user->hasPermission( 'airport.store' );
	}

	public function edit( User $user )
	{
		return $user->hasPermission( 'airport.edit' );
	}

	public function update( User $user )
	{
		return $user->hasPermission( 'airport.update' );
	}

	public function destroy( User $user )
	{
		return $user->hasPermission( 'airport.destroy' );
	}
}
