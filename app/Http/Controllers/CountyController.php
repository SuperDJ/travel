<?php

namespace App\Http\Controllers;

use App\State;
use App\County;
use Illuminate\Http\Request;

class CountyController extends Controller
{
	public function index() {
		return County::all();
	}

	public function store( Request $request ) {
		$store = County::create($request->all());

		if( $store ) {
			return response('County not created', 400);
		}
	}

	public function edit( County $county ) {
		return response()->json($county, 200);
	}

	public function update( Request $request, County $county ) {
		$update = $county->update($request->all());

		if( $update ) {
			return response('County not updated', 400);
		}
	}

	public function destroy( County $county ) {
		$destroy = $county->delete();

		if( $destroy ) {
			return response('County not delete', 400);
		}
	}

	public function show( County $county ) {
		return response()->json($county, 200);
	}

	public function fillDB() {
		set_time_limit(0);
		$states = State::all();

		$data = [];

		$response = json_decode( file_get_contents( 'http://www.geonames.org/childrenJSON?geonameId='.$states[0]->geonames_id.'&style=long' ) );

		print_r($response);

		/*
		foreach( $states as $country ) {
			$response = json_decode( file_get_contents( 'http://www.geonames.org/childrenJSON?geonameId='.$country->geonames_id.'&style=long' ) );

			if( !empty( $response->geonames ) ) {
				foreach( $response->geonames as $county => $value ) {
					$data[] = [
						'name' => $value->name,
						'countries_id' => $country->id,
						'latitude' => $value->lat,
						'longitude' => $value->lng,
						'population' => $value->population,
						'geonames_id' => $value->geonameId,
						'created_at' => date('Y-m-d H:i:s'),
						'updated_at' => date('Y-m-d H:i:s')
					];
				}
			}
		}

		County::insert($data);

		return response()->json($data, 200);*/
	}
}
