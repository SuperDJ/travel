<?php

namespace App\Http\Controllers;

use App\Airline;
use Illuminate\Http\Request;

class AirlineController extends Controller
{
	/**
	 * Display a listing of the resource.
	 * @return \App\Airline[]|\Illuminate\Database\Eloquent\Collection
	 */
    public function index()
    {
        return Airline::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store( Request $request )
    {
    	$stored = Airline::create( $request->all() );

    	if( $stored )
    	{
    		return response( 'Airline created', 201 );
		} else {
    		return response(' Airline not created', 400 );
		}
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Airline  $airline
     * @return \Illuminate\Http\Response
     */
    public function show( Airline $airline )
    {
        return response()->json( $airline, 200 );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Airline  $airline
     * @return \Illuminate\Http\Response
     */
    public function edit( Airline $airline )
    {
		return response()->json( $airline, 200 );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Airline  $airline
     * @return \Illuminate\Http\Response
     */
    public function update( Request $request, Airline $airline )
    {
		$update = $airline->update( $request->all() );

		if( $update )
		{
			return response( 'Airport updated', 200 );
		} else {
			return response( 'Airport not updated', 400 );
		}
    }

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Airline $airline
	 *
	 * @return \Illuminate\Http\Response
	 * @throws \Exception
	 */
    public function destroy( Airline $airline )
    {
		$destroy = $airline->delete();

		if( $destroy )
		{
			return response( 'Airport delete', 200 );
		} else {
			return response( 'Airport not delete', 400 );
		}
    }

    public function fillDB()
	{
		set_time_limit( 0 );
		$host = 'https://api.lufthansa.com';
		$max = 100;
		/**
		 * Get the auth key
		 */
		$ch = curl_init( $host.'/v1/oauth/token' );
		$postFields = 'client_id='.config( 'app.lufthansaKey' ).'&client_secret='.config( 'app.lufthansaSecret' ).'&grant_type=client_credentials';

		curl_setopt_array( $ch, [
			CURLOPT_POST > true,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_HTTPHEADER     => [
				'Content-Type: application/x-www-form-urlencoded',
				'Host: api.lufthansa.com'
			],
			CURLOPT_POSTFIELDS     => $postFields
		] );

		$response = json_decode( curl_exec( $ch ) );
		curl_close( $ch );

		$token = $response->access_token;

		/**
		 * Fill the database
		 */

		// Make a first request to know how many there are
		$context = stream_context_create([
			'http' => [
				'header'=> [
					'Accept: application/json',
					'Authorization:Bearer '.$token
				]
			]
		]);

		$response = json_decode( file_get_contents( $host.'/v1/references/airlines/?limit='.$max, false, $context ) );
		//return response()->json( $response, 200 );

		$total = (int)$response->AirlineResource->Meta->TotalCount;
		$totalRuns = ceil( $total / $max );
		$data = [];

		for( $runs = 1; $runs <= $totalRuns; $runs++ )
		{
			if( $runs === $totalRuns )
			{
				$max = ( ( $runs - 1 ) * 100 ) - $total;
			}

			$url = $host.'/v1/references/airlines/?limit='.$max.'&offset='.( ( $runs - 1 ) * $max );
			$response = json_decode( file_get_contents( $url, false, $context ) );

			foreach( $response->AirlineResource->Airlines->Airline as $key => $value )
			{
				if( !is_numeric( $value->AirlineID ) && !empty( $value->AirlineID_ICAO ) && $value->AirlineID_ICAO !== "\\N" )
				{
					if( Airline::where('name', $value->Names->Name->{'$'})->count() === 0 )
					{
						$data[] = [
							'name'       => $value->Names->Name->{'$'},
							'callsign'   => !empty( $value->OtherIDs ) ? $value->OtherIDs->OtherID->{'$'} : '',
							'iso'        => $value->AirlineID,
							'icao'       => $value->AirlineID_ICAO,
							'created_at' => date( 'Y-m-d H:i:s' ),
							'updated_at' => date( 'Y-m-d H:i:s' )
						];

						Airline::create([
							'name'       => $value->Names->Name->{'$'},
							'callsign'   => !empty( $value->OtherIDs ) ? $value->OtherIDs->OtherID->{'$'} : '',
							'iso'        => $value->AirlineID,
							'icao'       => $value->AirlineID_ICAO,
							'created_at' => date( 'Y-m-d H:i:s' ),
							'updated_at' => date( 'Y-m-d H:i:s' )
						]);
					}
				}
			}

			echo $url.'<br>';
			echo $runs.'<br>';

			sleep( 2 );
		}

		$response = json_decode( file_get_contents( 'https://api.skypicker.com/airlines' ) );

		$notUpdated = [];
		foreach( Airline::get() as $airline )
		{
			$key = array_search( $airline->name, array_column( $response,'name' ) );

			if( !empty( $key ) ) {
				$airline->update( [ 'iso' => $response[$key]->id ] );
			} else {
				$notUpdated[] = $airline->name;
			}
		}

		print_r( $notUpdated );
		return response()->json($data, 200);
	}
}
