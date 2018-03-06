<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FlightController extends Controller
{
	private $_url;

	function __construct()
	{
		$this->_url = 'http://partners.api.skyscanner.net/apiservices/';
	}

	/**
	 * Retrieve the cheapest quotes from cache prices
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function browseQuotes( Request $request )
	{
		return $this->browse( 'browsequotes', $request );
	}

	/**
	 * Retrieve the cheapest routes from cache prices
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function browseRoutes( Request $request )
	{
		return $this->browse( 'browseroutes', $request );
	}

	/**
	 * RRetrieve the cheapest dates for a given route from cache
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function browseDate( Request $request )
	{
		return $this->browse( 'browsedates', $request );
	}

	/**
	 * Retrieve the cheapest dates for a given route from caches
	 * with the results formatted as a two-dimensional array to be easily displayed as a calendar
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function browseDateGrid( Request $request )
	{
		return $this->browse( 'browsegrid', $request );
	}

	/**
	 * Execute request
	 *
	 * @param $type
	 * @param $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	private function browse( $type, $request )
	{
		$this->browseValidate( $request );

		$url = $this->_url.$type.'/v1.0/'.$request->input( 'country' ).'/'.
			$request->input( 'currency' ).'/'.
			$request->input( 'country' ).'/'.
			$request->input( 'language' ).'/'.
			$request->input( 'destination' ).'/'.
			$request->input( 'departureDate' );

		if( !empty( $request->input( 'destinationDate' ) ) ) {
			$url = $url.'/'.$request->input( 'destinationDate' );
		}

		$url = $url.'?apiKey='.config( 'app.skyscanner' );

		$response = json_decode( file_get_contents( $url ) );

		return response()->json( $response, 200 );
	}

	/**
	 * Validate request data for browse functions
	 *
	 * @param \Illuminate\Http\Request $request
	 */
	private function browseValidate( Request $request ) {
		$request->validate([
			'country' => 'required',
			'currency' => 'required',
			'language' => 'required',
			'departure' => 'required',
			'departureDate' => 'required|date',
			'destination' => 'required',
			'destinationDate' => 'date',
		]);
	}
}
