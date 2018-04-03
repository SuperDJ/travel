<?php

namespace App\Http\Controllers;

use App\Country;
use App\Currency;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \App\Currency[]|\Illuminate\Database\Eloquent\Collection
	 */
	public function index( Request $request )
	{
		if( !empty( $request->all() ) )
		{
			return Currency::withCount( 'country' )
				->withCount( 'profile' )
				->get();
		} else
		{
			return Currency::all();
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

		$stored = Currency::create( $request->all() );

		if( $stored )
		{
			return response()->json( [ 'success' => true, 'message' => 'Currency created' ], 201 );
		} else {
			return response()->json( [ 'success' => false, 'message' => 'Currency not created' ], 400 );
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param \App\Currency $currency
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function show( Currency $currency )
	{
		return response()->json( $currency, 200 );
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param \App\Currency $currency
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function edit( Currency $currency )
	{
		return response()->json( $currency, 200 );
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param \App\Currency             $currency
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function update( Request $request, Currency $currency )
	{
		$this->validation( $request );

		$updated = $currency->update( $request->all() );

		if( $updated )
		{
			return response()->json( [ 'success' => true, 'message' => 'Currency updated' ], 200 );
		} else {
			return response()->json( [ 'success' => false, 'message' => 'Currency not updated' ], 400 );
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param \App\Currency $currency
	 *
	 * @return \Illuminate\Http\Response
	 * @throws \Exception
	 */
	public function destroy( Currency $currency )
	{
		$destroyed = $currency->delete();

		if( $destroyed )
		{
			return response()->json( [ 'success' => true, 'message' => 'Currency deleted' ], 200 );
		} else {
			return response()->json( [ 'success' => false, 'message' => 'Currency not deleted' ], 400 );
		}
	}

	private function validation( Request $request )
	{
		$request->validate([
			'name' => 'required',
			'iso' => 'required'
		]);
	}

	/**
	 * Search currency
	 * @param $search
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function search( $search )
	{
		$result = Currency::where('name', 'like', '%'.$search.'%')
			->orWhere('id', $search)
			->orderBy('name', 'asc')
			->get();

		return response()->json( $result, 200 );
	}

	public function fillDB()
	{
		$currencies = json_decode( file_get_contents( 'https://openexchangerates.org/api/currencies.json' ) );

		$currenciesData = [];
		foreach( $currencies as $key => $value )
		{
			$currenciesData[] = [
				'name' => $value,
				'iso' => $key,
				'created_at' => date( 'Y-m-d H:i:s' ),
				'updated_at' => date( 'Y-m-d H:i:s' )
			];
		}

		Currency::insert( $currenciesData );

		return response()->json( $currenciesData, 200 );
	}
}
