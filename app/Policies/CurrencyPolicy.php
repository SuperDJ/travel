<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CurrencyPolicy
{
    use HandlesAuthorization;

	public function index( User $user )
	{
		return $user->hasPermission( 'currency.index' );
	}

	public function store( User $user )
	{
		return $user->hasPermission( 'currency.store' );
	}

	public function edit( User $user )
	{
		return $user->hasPermission( 'currency.edit' );
	}

	public function update( User $user )
	{
		return $user->hasPermission( 'currency.update' );
	}

	public function destroy( User $user )
	{
		return $user->hasPermission( 'currency.destroy' );
	}
}
