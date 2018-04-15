<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class RolePolicy
{
    use HandlesAuthorization;

	public function index( User $user )
	{
		return $user->hasPermission( 'role.index' );
	}

	public function store( User $user )
	{
		return $user->hasPermission( 'role.store' );
	}

	public function edit( User $user )
	{
		return $user->hasPermission( 'role.edit' );
	}

	public function update( User $user )
	{
		return $user->hasPermission( 'role.update' );
	}

	public function destroy( User $user )
	{
		return $user->hasPermission( 'role.destroy' );
	}
}
