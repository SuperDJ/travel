<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PermissionPolicy
{
    use HandlesAuthorization;

	public function index( User $user )
	{
		return $user->hasPermission( 'permission.index' );
	}

	public function store( User $user )
	{
		return $user->hasPermission( 'permission.store' );
	}

	public function edit( User $user )
	{
		return $user->hasPermission( 'permission.edit' );
	}

	public function update( User $user )
	{
		return $user->hasPermission( 'permission.update' );
	}

	public function destroy( User $user )
	{
		return $user->hasPermission( 'permission.destroy' );
	}
}
