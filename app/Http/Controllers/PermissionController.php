<?php

namespace App\Http\Controllers;

use App\Permission;
use App\Role;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth');
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \App\Permission[]|\Illuminate\Database\Eloquent\Collection
	 */
    public function index()
    {
        return Permission::all();
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

        $stored = Permission::create([
        	'name' => $request->input( 'name' )
		]);

        if( !empty( $request->roles ) )
		{
			foreach( $request->roles as $key => $value )
			{
				$role = Role::find( $value );
				$role->permissions()->attach( $stored );
			}
		}

		if( $stored )
		{
			return response()->json( [ 'success' => true, 'message' => 'Permission added' ], 201 );
		} else {
        	return response()->json( [ 'success' => false, 'message' => 'Permission not added' ], 400 );
		}
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function edit( Permission $permission )
    {
    	return response()->json( $permission );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function update( Request $request, Permission $permission )
    {
    	$this->validation( $request );

    	$updated = $permission->update([
    		'name' => $request->input( 'name' )
		]);

    	if( $updated )
		{
			return response()->json( [ 'success' => true, 'message' => 'Permission updated' ], 200 );
		} else {
    		return response()->json( [ 'success' => false, 'message' => 'Permission not updated' ], 400 );
		}
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function destroy( Permission $permission )
    {
        $destroyed = $permission->destroy();

        if( $destroyed )
		{
			return response()->json( [ 'success' => true, 'message' => 'Permission deleted' ], 200 );
		} else {
        	return response()->json( [ 'success' => false, 'message' => 'Permission not deleted' ], 400 );
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
			'name' => 'required|max:40'
		]);
	}
}
