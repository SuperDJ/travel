<?php

namespace App\Http\Controllers;

use App\Continent;
use Illuminate\Http\Request;

class ContinentController extends Controller
{
	/**
	 * Display a listing of the resource.
	 * @return \App\Continent[]|\Illuminate\Database\Eloquent\Collection
	 */
    public function index()
	{
    	return Continent::all();
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store( Request $request )
	{
    	$store = Continent::create( $request->all() );

    	if( $store )
    	{
    		return response( 'Continent created', 201 );
		} else {
    		return response( 'Continent not created', 400 );
		}
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param \App\Continent $continent
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function edit( Continent $continent )
	{
    	return response()->json( $continent, 200 );
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param \App\Continent            $continent
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function update( Request $request, Continent $continent )
	{
    	$update = $continent->update( $request->all() );

    	if( $update )
    	{
    		return response( 'Continent updated', 200 );
		} else {
    		return response( 'Continent not updated', 400 );
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param \App\Continent $continent
	 *
	 * @return \Illuminate\Http\Response
	 * @throws \Exception
	 */
	public function destroy( Continent $continent )
	{
    	$destroy = $continent->delete();

    	if( $destroy )
    	{
    		return response( 'Continent deleted', 200 );
		} else {
    		return response( 'Continent not delete', 400 );
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param \App\Continent $continent
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function show( Continent $continent )
	{
    	return response()->json( $continent, 200 );
	}

	public function fillDB()
	{
    	$response = json_decode( file_get_contents( 'https://raw.githubusercontent.com/annexare/Countries/master/data/continents.json' ) );

    	$data = [];

    	foreach( $response as $key => $value )
    	{
    		$data[] = [
    			'name' => $value,
				'iso' => $key,
				'created_at' => date('Y-m-d H:i:s'),
				'updated_at' => date('Y-m-d H:i:s')
			];
		}

		Continent::insert( $data );

		return response()->json( $data, 200 );
	}

	public function topDestinations( Continent $continent )
	{
		$cities = $continent->countries()
			->inRandomOrder()
			->take(7)
			->with( ['cities' => function( $query )
			{
				$query->where('capital', 1);
			}] )
			->get();

		return response()->json( $cities, 200 );
	}
}
