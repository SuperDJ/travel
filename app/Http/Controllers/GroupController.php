<?php

namespace App\Http\Controllers;

use App\Group;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class GroupController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \App\Group[]|\Illuminate\Database\Eloquent\Collection
	 */
	public function index( Request $request )
	{
		if( !empty( $request ) && count( $request->all() ) > 0 )
		{
			return Group::orderBy( $request->sortBy, $request->descending == 'true' ? 'desc' : 'asc' )
				->paginate( $request->rowsPerPage );
		} else {
			return Group::all();
		}
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

		$stored = Group::create( $request->all() );

		if( $stored )
		{
			return response()->json( [ 'success' => true, 'message' => 'Group created' ], 201 );
		} else {
			return response()->json( [ 'success' => false, 'message' => 'Group not created' ], 400 );
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param \App\Group $group
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function show( Group $group )
	{
		return response()->json( $group, 200 );
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param \App\Group $group
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function edit( Group $group )
	{
		return response()->json( $group, 200 );
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param \App\Group              $group
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function update( Request $request, Group $group )
	{
		$this->validation( $request );

		$updated = $group->update( $request->all() );

		if( $updated )
		{
			return response()->json( [ 'success' => true, 'message' => 'Group updated' ], 200 );
		} else {
			return response()->json( [ 'success' => false, 'message' => 'Group not updated' ], 400 );
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param \App\Group $group
	 *
	 * @return \Illuminate\Http\Response
	 * @throws \Exception
	 */
	public function destroy( Group $group )
	{
		$destroyed = $group->delete();

		if( $destroyed )
		{
			return response()->json( [ 'success' => true, 'message' => 'City deleted' ], 200 );
		} else {
			return response()->json( [ 'success' => false, 'message' => 'City not deleted' ], 400 );
		}
	}

	/**
	 * Search airports
	 *
	 * @param $search
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function search( $search )
	{
		$found = Group::where( 'name', 'like', '%'.$search.'%' )
			->orWhere( 'routes', 'like', '%'.$search.'%' )
			->orWhere( 'id', $search )
			->orderBy( 'name', 'asc' )
			->get();

		return response()->json( $found, 200 );
	}

	private function validation( Request $request )
	{
		$request->validate([
			'name' => $request->input( 'id' ) ? ['required', 'string', Rule::unique( 'groups' )->ignore( $request->input( 'id' ) ) ] : 'required|string|unique:groups',
		]);
	}
}
