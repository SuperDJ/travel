<?php

namespace App\Http\Controllers;

use App\Airport;
use Illuminate\Http\Request;

class FlightController extends Controller
{
	private $_url;

	function __construct() {
		$this->_url = 'http://partners.api.skyscanner.net/apiservices/';
	}

	public function browseQuotes( Request $request ) {
		$request->validate([
			'country' => 'required',
			'currency' => 'required',
			'language' => 'required',
			'departure' => 'required',
			'departureDate' => 'required|date',
			'destination' => 'required',
			'destinationDate' => 'date',
		]);

		$url = "{$this->_url}browsequotes/v1.0/{$request->input('country')}/{$request->input('currency')}/{$request->input('country')}/{$request->input('departure')}/{$request->input('destination')}/{$request->input('departureDate')}";

		if( !empty( $request->input('destinationDate') ) ) {
			$url = "{$url}/{$request->input('destinationDate')}";
		}

		$url = $url.'?apiKey='.env('SKYSCANNER_KEY');

		$ch = curl_init();
		curl_setopt_array($ch, [
			CURLOPT_URL => $url,
			CURLOPT_HEADER => 'Accept: application/json'
		]);

		$response = curl_exec($ch);
		curl_close($ch);

		return response()->json($response, 200);
	}
}
