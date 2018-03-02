<?php

namespace App\Http\Controllers;

use App\City;
use App\Airport;
use Illuminate\Http\Request;

class AirportController extends Controller
{
	/**
	 * Display a listing of the resource.
	 * @return \App\Airport[]|\Illuminate\Database\Eloquent\Collection
	 */
	public function index() {
		return Airport::all();
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store( Request $request ) {
		$store = Airport::create($request->all());

		if( $store ) {
			return response('Airport created', 201);
		} else {
			return response('Airport not created', 400);
		}
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param \App\Airport $airport
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function edit( Airport $airport ) {
		return response()->json($airport, 200);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param \App\Airport              $airport
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function update( Request $request, Airport $airport ) {
		$update = $airport->update($request->all());

		if( $update ) {
			return response('Airport updated', 200);
		} else {
			return response('Airport not updated', 400);
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
	public function destroy( Airport $airport ) {
		$destroy = $airport->delete();

		if( $destroy ) {
			return response('Airport delete', 200);
		} else {
			return response('Airport not delete', 400);
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param \App\Airport $airport
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function show( Airport $airport ) {
		return response()->json($airport, 200);
	}

	public function search( $search ) {
		$search = '%'.$search.'%';
	 	$found = Airport::where('name', 'like', $search)
			->orWhere('iata', 'like', $search)
			->orWhere('icao', 'like', $search)
			->orWhereHas('city', function( $query ) use( $search ) {
				$query->where('name', 'like', $search);
			})
			->orderBy('name', 'asc')
			->get();

	 	return response()->json($found, 200);
	}

	public function fillDB() {
		set_time_limit(0);
		/*
		$data = [];

		$response = json_decode( file_get_contents( 'http://partners.api.skyscanner.net/apiservices/geo/v1.0?apikey='.env('SKYSCANNER_KEY') ) );

		foreach( $response as $array ) {
			foreach( $array as $continents ) {
				foreach( $continents->Countries as $countries ) {
					foreach( $countries->Cities as $cities ) {
						foreach( $cities->Airports as $airports ) {
							print_r($airports);

							$location = explode( ', ', $airports->Location );
							$latitude = $location[1];
							$longitude = $location[0];

							$data[] = [
								'name' => $airports->Name,
								'cities_id' => City::where('iso', $airports->CityId)->value('id'),
								'latitude' => $latitude,
								'longitude' => $longitude,
								'iata' => $airports->Id,
								'created_at' => date( 'Y-m-d H:i:s' ),
								'updated_at' => date( 'Y-m-d H:i:s' )
							];
						}
					}
				}
			}
		}

		Airport::insert($data);*/

		$response = get_object_vars( json_decode( file_get_contents( 'https://raw.githubusercontent.com/mwgg/Airports/master/airports.json' ) ) );

		foreach( Airport::all() as $airport ) {
			// Get all keys where airports are found based on iata
			$key = array_search( $airport->iata, array_column( $response, 'iata', 'icao' ) );

			// If the key is not found get the key based on city name
			if( empty( $key ) && !empty( $airport->city ) ) {
				$key = array_search( mb_strtolower( $airport->city->name ), array_map( 'mb_strtolower', array_column( $response, 'city', 'icao' ) ) );
			}

			if( !empty( $key ) ) {
				echo $key.'<br>';
				$airport->update([
					'icao' => $key,
					'name' => $response[$key]->name
				]);
			}
		}
	}
}
