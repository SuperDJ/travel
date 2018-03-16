<?php

namespace App\Http\Controllers;

use App\Language;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
	/**
	 * Display a listing of the resource.
	 * @return \App\Language[]|\Illuminate\Database\Eloquent\Collection
	 */
	public function index()
	{
		return Language::all();
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store( Request $request )
	{
		$stored = Language::create( $request->all() );

		if( $stored )
		{
			return response()->json( ['success' => true, 'message' => 'Language created'], 201 );
		} else {
			return response()->json( ['success' => false, 'message' => 'Language not created'], 400 );
		}
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param \App\Language $language
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function edit( Language $language )
	{
		return response()->json( $language, 200 );
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param \App\Language             $language
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function update( Request $request, Language $language )
	{
		$updated = $language->update( $request->all() );

		if( $updated )
		{
			return response()->json( ['success' => true, 'message' => 'Language updated'], 200 );
		} else {
			return response()->json( ['success' => false, 'message' => 'Language not updated'], 400 );
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param \App\Language $language
	 *
	 * @return \Illuminate\Http\Response
	 * @throws \Exception
	 */
	public function destroy( Language $language )
	{
		$destroyed = $language->delete();

		if( $destroyed )
		{
			return response()->json( ['success' => true, 'message' => 'Language deleted'], 200 );
		} else {
			return response()->json( ['success' => false, 'message' => 'Language not deleted'], 400 );
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param \App\Language $language
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function show( Language $language )
	{
		return response()->json( $language, 200 );
	}

	/**
	 * Search language
	 *
	 * @param $search
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function search( $search )
	{
		$result = Language::where('name', 'like', '%'.$search.'%')
			->orWhere('id', $search)
			->orderBy('name', 'asc')
			->get();

		return response()->json( $result, 200 );
	}

	public function fillDB()
	{
		$data = [];
		$response = json_decode( file_get_contents( 'https://raw.githubusercontent.com/annexare/Countries/master/data/languages.json' ) );

		foreach( $response as $key => $value )
		{
			$data[] = [
				'name' => $value->name,
				'iso' => $key,
				'created_at' => date('Y-m-d H:i:s'),
				'updated_at' => date('Y-m-d H:i:s')
			];
		}

		Language::insert( $data );

		return response()->json( $data, 200 );
	}
}
