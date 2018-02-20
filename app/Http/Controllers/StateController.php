<?php

namespace App\Http\Controllers;

use App\Country;
use App\State;
use Illuminate\Http\Request;

class StateController extends Controller
{
	public function index() {
		return State::all();
	}

	public function store( Request $request ) {
		$store = State::create($request->all());

		if( $store ) {
			return response('State created', 201);
		} else {
			return response('State not created', 400);
		}
	}

	public function edit( State $state ) {
		return response()->json($state, 200);
	}

	public function update( Request $request, State $state ) {
		$update = $state->update($request->all());

		if( $update ) {
			return response('State updated', 200);
		} else {
			return response('State not updated', 400);
		}
	}

	public function destroy( State $state ) {
		$destroy = $state->delete();

		if( $destroy ) {
			return response('State deleted', 200);
		} else {
			return response('State not delete', 400);
		}
	}

	public function show( State $state ) {
		return response()->json($state, 200);
	}

	public function fillDB() {
		set_time_limit(0);
		$countries = Country::all();

		$data = [];

		foreach( $countries as $country ) {
			$response = json_decode( file_get_contents( 'http://www.geonames.org/childrenJSON?geonameId='.$country->geonames_id.'&style=long' ) );

			if( !empty( $response->geonames ) ) {
				foreach( $response->geonames as $state => $value ) {
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

		State::insert($data);

		return response()->json($data, 200);
	}
}
