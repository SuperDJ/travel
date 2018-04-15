<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AirlinePolicy
{
    use HandlesAuthorization;

	public function index( User $user )
	{
		return $user->hasPermission( 'airline.index' );
	}

	public function store( User $user )
	{
		return $user->hasPermission( 'airline.store' );
	}

	public function edit( User $user )
	{
		return $user->hasPermission( 'airline.edit' );
	}

	public function update( User $user )
	{
		return $user->hasPermission( 'airline.update' );
	}

	public function destroy( User $user )
	{
		return $user->hasPermission( 'airline.destroy' );
	}
}
