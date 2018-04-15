<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TimezonePolicy
{
    use HandlesAuthorization;

	public function index( User $user )
	{
		return $user->hasPermission( 'timezone.index' );
	}

	public function store( User $user )
	{
		return $user->hasPermission( 'timezone.store' );
	}

	public function edit( User $user )
	{
		return $user->hasPermission( 'timezone.edit' );
	}

	public function update( User $user )
	{
		return $user->hasPermission( 'timezone.update' );
	}

	public function destroy( User $user )
	{
		return $user->hasPermission( 'timezone.destroy' );
	}
}
