<?php

namespace App\Http\Controllers;

use App\Country;
use App\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
	public function index() {
		return City::all();
	}

	public function store( Request $request ) {
		$store = City::create($request->all());

		if( $store ) {
			return response('City not created', 400);
		}
	}

	public function edit( City $city ) {
		return response()->json($city, 200);
	}

	public function update( Request $request, City $city ) {
		$update = $city->update($request->all());

		if( $update ) {
			return response('City not updated', 400);
		}
	}

	public function destroy( City $city ) {
		$destroy = $city->delete();

		if( $destroy ) {
			return response('City not delete', 400);
		}
	}

	public function show( City $city ) {
		return response()->json($city, 200);
	}

	public function fillDB() {
		set_time_limit(0);
		$data = [];

		$city = City::count();

		$cities = json_decode( file_get_contents( 'https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json' ) );
		$countries = json_decode( file_get_contents( 'https://raw.githubusercontent.com/annexare/Countries/master/data/countries.json' ) );

		for( $i = $city; $i < count($cities); $i++ ) {
			$value = $cities[$i];

			$data[] = [
				'name'        => $value->name,
				'countries_id'   => Country::where('iso', $value->country)->first()->id,
				'latitude' => $value->lat,
				'longitude' => $value->lng,
				'capital' => $countries->{$value->country}->capital === $value->name ? 1 : 0,
				'created_at'  => date( 'Y-m-d H:i:s' ),
				'updated_at'  => date( 'Y-m-d H:i:s' )
			];

			City::create([
				'name'        => $value->name,
				'countries_id'   => Country::where('iso', $value->country)->first()->id,
				'latitude' => $value->lat,
				'longitude' => $value->lng,
				'capital' => $countries->{$value->country}->capital === $value->name ? 1 : 0,
				'created_at'  => date( 'Y-m-d H:i:s' ),
				'updated_at'  => date( 'Y-m-d H:i:s' )
			]);
		}

		echo $city.' of '.count($cities).' created';

		return response()->json($data, 200);
	}
}
