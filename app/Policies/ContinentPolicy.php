<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContinentPolicy
{
    use HandlesAuthorization;

	public function index( User $user )
	{
		return $user->hasPermission( 'continent.index' );
	}

	public function store( User $user )
	{
		return $user->hasPermission( 'continent.store' );
	}

	public function edit( User $user )
	{
		return $user->hasPermission( 'continent.edit' );
	}

	public function update( User $user )
	{
		return $user->hasPermission( 'continent.update' );
	}

	public function destroy( User $user )
	{
		return $user->hasPermission( 'continent.destroy' );
	}
}
