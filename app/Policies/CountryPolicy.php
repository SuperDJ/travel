<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CountryPolicy
{
    use HandlesAuthorization;

	public function index( User $user )
	{
		return $user->hasPermission( 'country.index' );
	}

	public function store( User $user )
	{
		return $user->hasPermission( 'country.store' );
	}

	public function edit( User $user )
	{
		return $user->hasPermission( 'country.edit' );
	}

	public function update( User $user )
	{
		return $user->hasPermission( 'country.update' );
	}

	public function destroy( User $user )
	{
		return $user->hasPermission( 'country.destroy' );
	}
}
