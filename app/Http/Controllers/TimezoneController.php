<?php

namespace App\Http\Controllers;

use App\Country;
use App\Timezone;
use Illuminate\Http\Request;

class TimezoneController extends Controller
{
	/**
	 * Display a listing of the resource.
	 * @return \App\Timezone[]|\Illuminate\Database\Eloquent\Collection
	 */
	public function index() {
		return Timezone::all();
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store( Request $request ) {
		$store = Timezone::create($request->all());

		if( $store ) {
			return response('Timezone created', 201);
		} else {
			return response('Timezone not created', 400);
		}
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param \App\Timezone $timezone
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function edit( Timezone $timezone ) {
		return response()->json($timezone, 200);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param \App\Timezone             $timezone
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function update( Request $request, Timezone $timezone ) {
		$update = $timezone->update($request->all());

		if( $update ) {
			return response('Timezone updated', 200);
		} else {
			return response('Timezone not updated', 400);
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param \App\Timezone $timezone
	 *
	 * @return \Illuminate\Http\Response
	 * @throws \Exception
	 */
	public function destroy( Timezone $timezone ) {
		$destroy = $timezone->delete();

		if( $destroy ) {
			return response('Timezone deleted', 200);
		} else {
			return response('Timezone not delete', 400);
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param \App\Timezone $timezone
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function show( Timezone $timezone ) {
		return response()->json($timezone, 200);
	}

	public function fillDB() {
		set_time_limit(0);
		$response = json_decode( file_get_contents( 'http://api.timezonedb.com/v2/list-time-zone?key='.env('TIMEZONE_KEY').'&format=json' ) );

		$data = [];

		foreach( $response->zones as $key => $value ) {
			$id = '';

			if( $value->countryCode !== $id ) {
				$country = Country::where('iso', $value->countryCode)->first();
			}

			if( !empty( $country ) ) {
				$id = $country->id;

				$data[] = [
					'country_id' => $id,
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
