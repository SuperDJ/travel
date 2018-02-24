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
		$states = State::all()->count();


		$data = [];
		//$i = 0;

		for( $i = 3891; $i <= $states; $i++ ) {
			$state = State::where('id', $i)->first();
			$response = json_decode( file_get_contents( 'http://www.geonames.org/childrenJSON?geonameId='.$state->geonames_id.'&style=long' ) );
			if( !empty( $response->geonames ) ) {
				foreach( $response->geonames as $county => $value ) {
					$data[] = [
						'name'        => $value->name,
						'states_id'   => $state->id,
						'latitude'    => $value->lat,
						'longitude'   => $value->lng,
						'geonames_id' => $value->geonameId,
						'created_at'  => date( 'Y-m-d H:i:s' ),
						'updated_at'  => date( 'Y-m-d H:i:s' )
					];

					County::create([
						'name'        => $value->name,
						'states_id'   => $state->id,
						'latitude'    => $value->lat,
						'longitude'   => $value->lng,
						'geonames_id' => $value->geonameId,
						'created_at'  => date( 'Y-m-d H:i:s' ),
						'updated_at'  => date( 'Y-m-d H:i:s' )
					]);
				}
			}
			echo '#'.$i.' / '.$states->count().'<br>';
		}

		/*
		foreach( $states as $state ) {
			echo $state->geonames_id.'<br>';
			$response = json_decode( file_get_contents( 'http://www.geonames.org/childrenJSON?geonameId='.$state->geonames_id.'&style=long' ) );

			if( !empty( $response->geonames ) ) {
				foreach( $response->geonames as $county => $value ) {
					$data[] = [
						'name'        => $value->name,
						'states_id'   => $state->id,
						'latitude'    => $value->lat,
						'longitude'   => $value->lng,
						'geonames_id' => $value->geonameId,
						'created_at'  => date( 'Y-m-d H:i:s' ),
						'updated_at'  => date( 'Y-m-d H:i:s' )
					];

					County::create([
						'name'        => $value->name,
						'states_id'   => $state->id,
						'latitude'    => $value->lat,
						'longitude'   => $value->lng,
						'geonames_id' => $value->geonameId,
						'created_at'  => date( 'Y-m-d H:i:s' ),
						'updated_at'  => date( 'Y-m-d H:i:s' )
					]);
				}
			}
			echo '#'.$i.' / '.$states->count().'<br>';
			$i++;
		} */

		return response()->json($data, 200);
	}
}
