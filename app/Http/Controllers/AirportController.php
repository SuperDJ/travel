<?php

namespace App\Http\Controllers;

use App\City;
use App\Airport;
use Illuminate\Http\Request;

class AirportController extends Controller
{
	public function index() {
		return Airport::all();
	}

	public function store( Request $request ) {
		$store = Airport::create($request->all());

		if( $store ) {
			return response('Airport not created', 400);
		}
	}

	public function edit( Airport $airport ) {
		return response()->json($airport, 200);
	}

	public function update( Request $request, Airport $airport ) {
		$update = $airport->update($request->all());

		if( $update ) {
			return response('Airport not updated', 400);
		}
	}

	public function destroy( Airport $airport ) {
		$destroy = $airport->delete();

		if( $destroy ) {
			return response('Airport not delete', 400);
		}
	}

	public function show( Airport $airport ) {
		return response()->json($airport, 200);
	}

	public function fillDB() {
		set_time_limit(0);
		$counties = City::all();

		$data = [];
		$i = 0;

		$response = json_decode( file_get_contents( 'http://www.geonames.org/childrenJSON?geonameId='.$counties[0]->geonames_id.'&style=long' ) );
		print_r($response);

		/*
		foreach( $counties as $county ) {
			echo $county->geonames_id.'<br>';
			$response = json_decode( file_get_contents( 'http://www.geonames.org/childrenJSON?geonameId='.$county->geonames_id.'&style=long' ) );

			if( !empty( $response->geonames ) ) {
				foreach( $response->geonames as $airport => $value ) {
					$data[] = [
						'name'        => $value->name,
						'county_id'   => $county->id,
						'latitude'    => $value->lat,
						'longitude'   => $value->lng,
						'geonames_id' => $value->geonameId,
						'created_at'  => date( 'Y-m-d H:i:s' ),
						'updated_at'  => date( 'Y-m-d H:i:s' )
					];

					Airport::create([
						'name'        => $value->name,
						'county_id'   => $county->id,
						'latitude'    => $value->lat,
						'longitude'   => $value->lng,
						'geonames_id' => $value->geonameId,
						'created_at'  => date( 'Y-m-d H:i:s' ),
						'updated_at'  => date( 'Y-m-d H:i:s' )
					]);
				}
			}
			echo '#'.$i.' / '.$counties->count().'<br>';
			$i++;
		}*/

		return response()->json($data, 200);
	}
}
