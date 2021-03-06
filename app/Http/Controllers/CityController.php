<?php

namespace App\Http\Controllers;

use App\Country;
use App\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \App\City[]|\Illuminate\Database\Eloquent\Collection
	 */
	public function index( Request $request )
	{
		if( !empty( $request->all() ) )
		{
			return City::with( 'country' )
				->withCount( 'airports' )
				->get();
		} else {
			return City::all();
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

		$stored = City::create( $request->all() );

		if( $stored )
		{
			return response()->json( [ 'success' => true, 'message' => 'City created' ], 201 );
		} else {
			return response()->json( [ 'success' => false, 'message' => 'City not created' ], 400 );
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param \App\City $city
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function show( City $city )
	{
		return response()->json( $city, 200 );
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param \App\City $city
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function edit( City $city )
	{
		return response()->json( $city, 200 );
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param \App\City                 $city
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function update( Request $request, City $city )
	{
		$this->validation( $request );

		$updated = $city->update( $request->all() );

		if( $updated )
		{
			return response()->json( [ 'success' => true, 'message' => 'City updated' ], 200 );
		} else {
			return response()->json( [ 'success' => false, 'message' => 'City not updated' ], 400 );
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param \App\City $city
	 *
	 * @return \Illuminate\Http\Response
	 * @throws \Exception
	 */
	public function destroy( City $city )
	{
		$destroyed = $city->delete();

		if( $destroyed )
		{
			return response( 'City delete', 200 );
		} else {
			return response( 'City not delete', 400 );
		}
	}

	/**
	 * Search city
	 *
	 * @param $search
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function search( $search ) {
		$result = City::where('name', 'like', '%'.$search.'%')
			->orWhere('id', $search)
			->with('country')
			->orderBy('name', 'asc')
			->get();

		return response()->json( $result, 200 );
	}

	private function validation( Request $request )
	{
		$request->validate([
			'name' => 'required|string',
			'capital' => 'boolean',
			'latitude' => 'required|string',
			'longitude' => 'required|string',
			'country_id' => 'required|integer|exists:countries,id',
			'iso' => 'required|string',
			'iata' => 'required|string'
		]);
	}

	public function fillDB()
	{
		set_time_limit( 0 );
		$data = [];

		$city = City::count();

		$cities = json_decode( file_get_contents( 'https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json' ) );
		$countries = json_decode( file_get_contents( 'https://raw.githubusercontent.com/annexare/Countries/master/data/countries.json' ) );

		for( $i = $city; $i < count( $cities ); $i++ )
		{
			$value = $cities[$i];
			$countryId = Country::where(b'iso', $value->country )->value( 'id' );

			$data[] = [
				'name'        => $value->name,
				'country_id'   => $countryId,
				'latitude' => $value->lat,
				'longitude' => $value->lng,
				'capital' => $countries->{$value->country}->capital === $value->name ? 1 : 0,
				'created_at'  => date( 'Y-m-d H:i:s' ),
				'updated_at'  => date( 'Y-m-d H:i:s' )
			];

			City::create([
				'name'        => $value->name,
				'country_id'   => $countryId,
				'latitude' => $value->lat,
				'longitude' => $value->lng,
				'capital' => $countries->{$value->country}->capital === $value->name ? 1 : 0,
				'created_at'  => date( 'Y-m-d H:i:s' ),
				'updated_at'  => date( 'Y-m-d H:i:s' )
			]);
		}

		echo $city.' of '.count( $cities ).' created';

		// Add or update additional cities
		if( $city >= count( $cities ) )
		{
			$response = json_decode( file_get_contents( 'http://partners.api.skyscanner.net/apiservices/geo/v1.0?apikey='.config('app.skyscanner') ) );

			foreach( $response as $array )
			{
				foreach( $array as $continents )
				{
					foreach( $continents->Countries as $countries )
					{
						foreach( $countries->Cities as $cities )
						{
							$countryId = $cities->CountryId;

							switch( $countryId )
							{
								case 'KO';
									$countryId = 'XK';
									break;
								case 'UK':
									$countryId = 'GB';
									break;
							}

							$countryId = Country::where( 'iso', $countryId )->value( 'id' );

							if( City::where([[ 'name', $cities->Name ],	[ 'country_id', $countryId ] ] )->count() <= 1 )
							{
								$city = City::where( [
									[ 'name', $cities->Name ],
									[ 'country_id', $countryId ]
								] )->first();

								// Get cities location
								$location = explode( ', ', $cities->Location );
								$latitude = $location[1];
								$longitude = $location[0];

								// If city doesn't exist create it if it does update it
								if( empty( $city ) )
								{
									echo $countries->Name.' '.$countries->Id.' '.$cities->Name.'<br>';
									print_r( $cities );
									$data[] = [
										'name'         => $cities->Name,
										'country_id' => $countryId,
										'iso'          => $cities->Id,
										'iata'         => $cities->IataCode,
										'latitude'     => $latitude,
										'longitude'    => $longitude,
										'created_at'   => date( 'Y-m-d H:i:s' ),
										'updated_at'   => date( 'Y-m-d H:i:s' )
									];

									City::create( [
										'name'         => $cities->Name,
										'country_id' => $countryId,
										'iso'          => $cities->Id,
										'iata'         => $cities->IataCode,
										'latitude'     => $latitude,
										'longitude'    => $longitude,
										'created_at'   => date( 'Y-m-d H:i:s' ),
										'updated_at'   => date( 'Y-m-d H:i:s' )
									] );
								} else {
									$city->update( [
										'iso'  => $cities->Id,
										'iata' => $cities->IataCode,
									] );
								}
							} else {
								$location = explode( ', ', $cities->Location );
								$latitude = explode('.', $location[1] )[0];
								$longitude = explode('.', $location[0] )[0];

								$data = [
									[ 'name', $cities->Name ],
									[ 'country_id', $countryId ],
									[ 'latitude', 'like', $latitude.'%' ],
									[ 'longitude', 'like', $longitude.'%' ]
								];

								$duplicate = City::where( $data )->count();

								//TODO make a check to see if a latitude or longitude with a +1 or -1 does equal a record

								switch($duplicate)
								{
									case 1:
										City::where( $data )->first()->update( [ 'iso'  => $cities->Id, 'iata' => $cities->IataCode] );
										break;
									case 2:
										City::where( $data )->first()->update( [ 'iso'  => $cities->Id, 'iata' => $cities->IataCode] );
										City::where( $data )->orderBy( 'id', 'desc' )->first()->delete();
										break;
								}

								echo $cities->Name.' '.$cities->Location.' '.$countries->Name.' duplicate. '.$duplicate.'<br>';
							}
						}
					}
				}
			}
		}

		return response()->json( $data, 200 );
	}
}
