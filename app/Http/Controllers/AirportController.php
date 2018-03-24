<?php

namespace App\Http\Controllers;

use App\City;
use App\Airport;
use Illuminate\Http\Request;

class AirportController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \App\Airport[]|\Illuminate\Database\Eloquent\Collection
	 */
	public function index( Request $request )
	{
		if( !empty( $request ) && count( $request->all() ) > 0 )
		{
			return Airport::orderBy( $request->sortBy, $request->descending == 'true' ? 'desc' : 'asc' )
				->with( 'city' )
				->paginate( $request->rowsPerPage );
		} else {
			return Airport::all();
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

		$stored = Airport::create( $request->all() );

		if( $stored )
		{
			return response()->json( [ 'success' => true, 'message' => 'Airport created' ], 201 );
		} else {
			return response()->json( [ 'success' => false, 'message' => 'Airport not created' ], 400 );
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param \App\Airport $airport
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function show( Airport $airport )
	{
		return response()->json( $airport, 200 );
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param \App\Airport $airport
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function edit( Airport $airport )
	{
		return response()->json( $airport, 200 );
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param \App\Airport              $airport
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function update( Request $request, Airport $airport )
	{
		$this->validation( $request );

		$updated = $airport->update( $request->all() );

		if( $updated )
		{
			return response()->json( [ 'success' => true, 'message' => 'Airport updated' ], 200 );
		} else {
			return response()->json( [ 'success' => false, 'message' => 'Airport not updated' ], 400 );
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param \App\Airport $airport
	 *
	 * @return \Illuminate\Http\Response
	 * @throws \Exception
	 */
	public function destroy( Airport $airport )
	{
		$destroyed = $airport->delete();

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
		if( ctype_digit( $search ) )
		{
			$found = Airport::where( 'id', (int)$search )
			->with([ 'city' => function( $query )
			{
				$query->with( 'country' );
			}])
			->orderBy( 'name', 'asc' )
			->get();
		} else {
			$search = '%'.$search.'%';
			$found = Airport::where( 'name', 'like', $search )
				->orWhere( 'iata', 'like', $search )
				->orWhere( 'icao', 'like', $search )
				->orWhereHas( 'city', function( $query ) use ( $search )
				{
					$query->where( 'name', 'like', $search );
				} )
				->with( [
					'city' => function( $query ) use ( $search )
					{
						$query->with( 'country' );
					}
				] )
				->orderBy( 'name', 'asc' )
				->get();
		}

	 	return response()->json( $found, 200 );
	}

	private function validation( Request $request )
	{
		$request->validate([
			'name' => 'required|string',
			'icao' => 'required|string',
			'iata' => 'required|string',
			'latitude' => 'required|string',
			'longitude' => 'required|string',
			'city_id' => 'required|integer|exists:cities,id'
		]);
	}

	public function fillDB()
	{
		set_time_limit( 0 );
		$airports = Airport::count();

 		if( $airports === 0 ) {
			$data = [];

			$response = json_decode( file_get_contents( 'http://partners.api.skyscanner.net/apiservices/geo/v1.0?apikey='.config('app.skyscanner') ) );

			foreach( $response as $array )
			{
				foreach( $array as $continents )
				{
					foreach( $continents->Countries as $countries )
					{
						foreach( $countries->Cities as $cities )
						{
							foreach( $cities->Airports as $airports )
							{
								$location = explode( ', ', $airports->Location );
								$latitude = $location[1];
								$longitude = $location[0];

								if( Airport::where( 'name', $airports->Name )->count() === 0 )
								{
									$data[] = [
										'name'       => $airports->Name,
										'city_id'    => City::where( 'iso', $airports->CityId )->value( 'id' ),
										'latitude'   => $latitude,
										'longitude'  => $longitude,
										'iata'       => $airports->Id,
										'created_at' => date( 'Y-m-d H:i:s' ),
										'updated_at' => date( 'Y-m-d H:i:s' )
									];
								}
							}
						}
					}
				}
			}

			Airport::insert( $data );
		}


		if( $airports > 0 )
		{
			$response = get_object_vars( json_decode( file_get_contents( 'https://raw.githubusercontent.com/mwgg/Airports/master/airports.json' ) ) );

			foreach( Airport::all() as $airport )
			{
				// Get all keys where airports are found based on iata
				$key = array_search( $airport->iata, array_column( $response, 'iata', 'icao' ) );

				// If the key is not found get the key based on city name
				if( empty( $key ) && !empty( $airport->city ) )
				{
					$key = array_search( mb_strtolower( $airport->city->name ), array_map( 'mb_strtolower', array_column( $response, 'city', 'icao' ) ) );
				}

				if( !empty( $key ) )
				{
					echo $key.'<br>';
					$airport->update( [
						'icao' => $key,
						'name' => $response[$key]->name
					] );
				}
			}
		}
	}
}
