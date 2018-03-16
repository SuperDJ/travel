<?php

namespace App\Http\Controllers;

use App\Airport;
use App\Airline;
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
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function browseQuotes( Request $request )
	{
		$response = $this->browse( 'browsequotes', $request );

		$data = [];
		$i = 0;
		foreach( $response->Quotes as $key => $value )
		{
			if( !empty( $value->OutboundLeg->CarrierIds ) && !empty( $value->InboundLeg->CarrierIds ) )
			{
				$currency = $response->Currencies[ 0 ];
				$price = $currency->Symbol.( $currency->SpaceBetweenAmountAndSymbol ? ' ' : '' ).number_format( $value->MinPrice, $currency->DecimalDigits, $currency->DecimalSeparator, $currency->ThousandsSeparator );
				$toCarrier = $response->Carriers[ array_search( $value->OutboundLeg->CarrierIds[ 0 ], array_column( $response->Carriers, 'CarrierId' ) ) ]->Name;
				$returnCarrier = $response->Carriers[ array_search( $value->InboundLeg->CarrierIds[ 0 ], array_column( $response->Carriers, 'CarrierId' ) ) ]->Name;
				$toOrigin = $response->Places[ array_search( $value->OutboundLeg->OriginId, array_column( $response->Places, 'PlaceId' ) ) ]->IataCode;
				$toDestination = $response->Places[ array_search( $value->OutboundLeg->DestinationId, array_column( $response->Places, 'PlaceId' ) ) ]->IataCode;
				$returnOrigin = $response->Places[ array_search( $value->InboundLeg->OriginId, array_column( $response->Places, 'PlaceId' ) ) ]->IataCode;
				$returnDestination = $response->Places[ array_search( $value->InboundLeg->DestinationId, array_column( $response->Places, 'PlaceId' ) ) ]->IataCode;

				$data[ $i ] = [
					'direct' => $value->Direct,
					'price'  => $price,
					'to'     => [
						'carrier'     => Airline::where('name', 'like', '%'.$toCarrier.'%')->orWhere('callsign', 'like', '%'.$toCarrier.'%')->first() ?? $toCarrier,
						'date'        => str_replace( 'T', '', $value->OutboundLeg->DepartureDate ),
						'origin'      => Airport::where( 'iata', $toOrigin )->with( [
							'city' => function( $query )
							{
								$query->with( 'country' );
							}
						] )->first(),
						'destination' => Airport::where( 'iata', $toDestination )->with( [
							 'city' => function( $query )
							 {
								 $query->with( 'country' );
							 }
						] )->first()
					]
				];

				if( !empty( $request->input( 'destinationDate' ) ) )
				{
					$data[ $i ]
						['return'] = [
							'carrier'     => Airline::where( 'name', 'like', '%'.$returnCarrier.'%' )->orWhere( 'callsign', 'like', '%'.$returnCarrier.'%' )->first() ?? $returnCarrier,
							'date'        => str_replace( 'T', ' ', $value->InboundLeg->DepartureDate ),
							'origin'      => Airport::where( 'iata', $returnOrigin )->with( [
								'city' => function( $query )
								{
									$query->with( 'country' );
								}
							] )->first(),
							'destination' => Airport::where( 'iata', $returnDestination )->with( [
								'city' => function( $query )
								{
									$query->with( 'country' );
								}
							] )->first()
						];
				}
				$i++;
			}
		}

		return response()->json( $data, 200 );
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
		return response()->json( $this->browse( 'browseroutes', $request ), 200 );
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
		return response()->json( $this->browse( 'browsedates', $request ), 200 );
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
		return response()->json( $this->browse( 'browsegrid', $request ), 200 );
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

		return $response;
	}

	/**
	 * Validate request data for browse functions
	 *
	 * @param \Illuminate\Http\Request $request
	 */
	private function browseValidate( Request $request )
	{
		$request->validate([
			'country' => 'required',
			'currency' => 'required',
			'language' => 'required',
			'departure' => 'required',
			'departureDate' => 'required|date',
			'destination' => 'required',
			'destinationDate' => 'date|nullable',
		]);
	}

	private function validation( Request $request )
	{
		$validate = $request->validate([
			'departure' => 'required|exists:airports,iata',
			'departureDate' => 'required|date|after:today',
			'destination' => 'required|exists:airports,iata',
			'destinationDate' => 'nullable|after:departureDate',
			'adults' => 'required|integer',
			'children' => 'nullable|integer',
			'infants' => 'nullable|integer',
			'cabinClass' => 'nullable',
			'country' => 'required|exists:countries,iso',
			'currency' => 'required|exists:currencies,iso',
			'language' => 'required|exists:languages,iso'
		]);

		return $validate;
	}

	public function createSession( Request $request )
	{
		$this->validation( $request );

		$postfields = 'country='.$request->input( 'country' ).
			'&currency='.$request->input( 'currency' ).
			'&locale='.$request->input( 'language' ).
			'&originPlace='.$request->input( 'departure' ).
			'&destinationPlace='.$request->input( 'destination' ).
			'&outboundDate='.$request->input( 'departureDate' ).
			'&adults='.$request->input( 'adults' ).
			'&apiKey='.config('app.skyscanner');

		if( !empty( $request->input( 'destinationDate' ) ) )
		{
			$postfields = $postfields.'&inboundDate='.$request->input( 'destinationDate' );
		}

		if( !empty( $request->input( 'cabinClass' ) ) )
		{
			$postfields = $postfields.'&cabinClass='.$request->input( 'cabinClass' );
		}

		if( !empty( $request->input( 'children' ) ) )
		{
			$postfields = $postfields.'&children='.$request->input( 'children' );
		}

		if( !empty( $request->input( 'infants' ) ) )
		{
			$postfields = $postfields.'&infants='.$request->input( 'infants' );
		}

		$postfields = urlencode( $postfields );

		echo $postfields;

		$ch = curl_init();
		curl_setopt_array( $ch, [
			CURLOPT_URL => 'http://partners.api.skyscanner.net/apiservices/pricing/v1.0',
			CURLOPT_POST => true,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_POSTFIELDS => $postfields,
			CURLOPT_HEADER => [
				'Content-Type: application/x-www-form-urlencoded',
				'X-Forward-For: '.$_SERVER['REMOTE_ADDR'],
				'Accept: application/json'
			],
		]);

		$response = curl_exec( $ch );
		curl_close( $ch );

		return response()->json( $response );
	}
}
