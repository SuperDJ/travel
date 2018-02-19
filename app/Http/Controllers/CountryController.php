<?php

namespace App\Http\Controllers;

use App\Continent;
use App\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
	public function index() {
		return Country::all();
	}

	public function store( Request $request ) {
		$store = Country::create($request->all());

		if( $store ) {
			return response('Country created', 201);
		} else {
			return response('Country not created', 400);
		}
	}

	public function edit( Country $country ) {
		return response()->json($country, 200);
	}

	public function update( Request $request, Country $country ) {
		$update = $country->update($request->all());

		if( $update ) {
			return response('Country updated', 200);
		} else {
			return response('Country not updated', 400);
		}
	}

	public function destroy( Country $country ) {
		$destroy = $country->delete();

		if( $destroy ) {
			return response('Country deleted', 200);
		} else {
			return response('Country not delete', 400);
		}
	}

	public function show( Country $country ) {
		return response()->json($country, 200);
	}

	public function fillDB() {
		$continents = Continent::all();

		foreach( $continents as $continent ) {
			$response = json_decode( file_get_contents( 'http://www.geonames.org/childrenJSON?geonameId='.$continent->geonames_id.'&style=long' ) );

			foreach( $response->geonames as $country => $value ) {
				Country::create([
					'name' => $value->name,
					'continents_id' => $continent->id,
					'latitude' => $value->lat,
					'longitude' => $value->lng,
					'population' => $value->population,
					'iso_code' => $value->countryCode,
					'geonames_id' => $value->geonameId
				]);
			}
		}

		return response('Countries added');
	}
}
