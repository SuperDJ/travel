<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

	public function index( User $user )
	{
		return $user->hasPermission( 'user.index' );
	}

	public function store( User $user )
	{
		return $user->hasPermission( 'user.store' );
	}

	public function edit( User $user )
	{
		return $user->hasPermission( 'user.edit' );
	}

	public function update( User $user )
	{
		return $user->hasPermission( 'user.update' );
	}

	public function destroy( User $user )
	{
		return $user->hasPermission( 'user.destroy' );
	}
}
