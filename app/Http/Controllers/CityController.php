<?php

namespace App\Http\Controllers;

use App\County;
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
		$counties = County::count();
		$cities = City::all()->last();
		$start = !empty($cities->counties_id) ? $cities->counties_id : 1;
		$limit = 2000;

		$data = [];

		for( $i = $start; $i <= ($start + $limit); $i++ ) {
			$county = County::where('id', $i)->first();
			$response = json_decode( file_get_contents( 'http://www.geonames.org/childrenJSON?geonameId='.$county->geonames_id.'&style=long' ) );

			if( !empty( $response->geonames ) ) {
				foreach( $response->geonames as $city => $value ) {
					$data[] = [
						'name'        => $value->name,
						'counties_id'   => $county->id,
						'latitude'    => $value->lat,
						'longitude'   => $value->lng,
						'geonames_id' => $value->geonameId,
						'population'  => $value->population,
						'created_at'  => date( 'Y-m-d H:i:s' ),
						'updated_at'  => date( 'Y-m-d H:i:s' )
					];

					City::create([
						'name'        => $value->name,
						'counties_id'   => $county->id,
						'latitude'    => $value->lat,
						'longitude'   => $value->lng,
						'geonames_id' => $value->geonameId,
						'population'  => $value->population,
						'created_at'  => date( 'Y-m-d H:i:s' ),
						'updated_at'  => date( 'Y-m-d H:i:s' )
					]);
				}
			}

			echo '#'.$i.' / '.$counties.'<br>';
		}

		return response()->json($data, 200);
	}
}
