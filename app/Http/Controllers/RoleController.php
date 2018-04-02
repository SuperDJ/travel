<?php

namespace App\Http\Controllers;

use App\Role;
use App\Permission;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RoleController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth');
	}

	/**
	 * Display a listing of the resource.
	 * @return \App\Role[]|\Illuminate\Database\Eloquent\Collection
	 */
    public function index()
    {
        return Role::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store( Request $request )
    {
        $this->validation( $request );

        $created = Role::create([
        	'name' => $request->input( 'name' )
		]);

        if( !empty( $request->permissions ) )
		{
			Role::permissions()->attach( $request->permissions );
		}

		if( $created ) {
			return response()->json( [ 'success' => true, 'message' => 'Role has been added' ], 201 );
		} else {
        	return response()->json( [ 'success' => false, 'message' => 'Role not created' ], 400 );
		}
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function edit( Role $role )
    {
     	return response()->json( $role );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update( Request $request, Role $role )
    {
        $this->validation( $request );

        $updated = $role->update([
        	'name' => $request->input( 'name' )
		]);

        if( !empty( $request->permissions ) )
		{
			$role->permissions()->sync( $request->permissions );
		}

		if( $updated )
		{
			return response()->json( [ 'success' => true, 'message' => 'Role has been updated' ], 200 );
		} else {
        	return response()->json( [ 'success' => false, 'message' => 'Role could not be updated' ], 400 );
		}
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy( Role $role )
    {
        $destroyed = $role->destroy();

        if( $destroyed )
		{
			return response()->json( [ 'success' => true, 'message' => 'Role has been deleted' ], 200 );
		} else {
        	return response()->json( [ 'success' => false, 'message' => 'Role could not be deleted'  ], 400 );
		}
    }

	/**
	 * Validate input
	 *
	 * @param \Illuminate\Http\Request $request
	 */
    private function validation( Request $request )
	{
		$request->validate([
			'name' => $request->input( 'id' ) ? [ 'required', 'string', Rule::unique( 'roles' )->ignore( $request->input( 'id' ) ) ] : 'require|string|unique:roles',
			'permissions' => 'required|array'
		]);
	}
}
