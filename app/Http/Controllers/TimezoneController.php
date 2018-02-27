<?php

namespace App\Http\Controllers;

use App\Country;
use App\Timezone;
use Illuminate\Http\Request;

class TimezoneController extends Controller
{
	public function index() {
		return Timezone::all();
	}

	public function store( Request $request ) {
		$store = Timezone::create($request->all());

		if( $store ) {
			return response('Timezone created', 201);
		} else {
			return response('Timezone not created', 400);
		}
	}

	public function edit( Timezone $timezone ) {
		return response()->json($timezone, 200);
	}

	public function update( Request $request, Timezone $timezone ) {
		$update = $timezone->update($request->all());

		if( $update ) {
			return response('Timezone updated', 200);
		} else {
			return response('Timezone not updated', 400);
		}
	}

	public function destroy( Timezone $timezone ) {
		$destroy = $timezone->delete();

		if( $destroy ) {
			return response('Timezone deleted', 200);
		} else {
			return response('Timezone not delete', 400);
		}
	}

	public function show( Timezone $timezone ) {
		return response()->json($timezone, 200);
	}

	public function fillDB() {
		set_time_limit(0);
		$response = json_decode( file_get_contents( 'http://api.timezonedb.com/v2/list-time-zone?key=FV8LB3C2ARKO&format=json' ) );

		$data = [];

		foreach( $response->zones as $key => $value ) {
			$id = '';

			if( $value->countryCode !== $id ) {
				$country = Country::where('iso', $value->countryCode)->first();
			}

			if( !empty( $country ) ) {
				$id = $country->id;

				$data[] = [
					'countries_id' => $id,
					'name'       => $value->zoneName,
					'gmt_offset' => $value->gmtOffset,
					'created_at' => date('Y-m-d H:i:s'),
					'updated_at' => date('Y-m-d H:i:s')
				];
			}
		}
		Timezone::insert($data);

		return response()->json($data, 200);
	}
}
