<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class LanguagePolicy
{
    use HandlesAuthorization;

	public function index( User $user )
	{
		return $user->hasPermission( 'language.index' );
	}

	public function store( User $user )
	{
		return $user->hasPermission( 'language.store' );
	}

	public function edit( User $user )
	{
		return $user->hasPermission( 'language.edit' );
	}

	public function update( User $user )
	{
		return $user->hasPermission( 'language.update' );
	}

	public function destroy( User $user )
	{
		return $user->hasPermission( 'language.destroy' );
	}
}
