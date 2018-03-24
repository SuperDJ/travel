<?php

namespace App\Http\Controllers;

use App\Airline;
use Illuminate\Http\Request;

class AirlineController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \App\Airline[]|\Illuminate\Database\Eloquent\Collection
	 */
    public function index( Request $request )
    {
    	if( !empty( $request ) && count( $request->all() ) > 0 )
		{
			return Airline::orderBy( $request->sortBy, $request->descending == 'true' ? 'desc' : 'asc' )
				->paginate( $request->rowsPerPage );
		} else {
			return Airline::all();
		}
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store( Request $request )
    {
    	$this->validation( $request );

    	$stored = Airline::create( $request->all() );

    	if( $stored )
    	{
    		return response()->json( [ 'success' => true, 'message' => 'Airline created' ], 201 );
		} else {
    		return response()->json( [ 'success' => false, 'message' => 'Airline not created' ], 400 );
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
    	$this->validation( $request );

		$updated = $airline->update( $request->all() );

		if( $updated )
		{
			return response()->json( [ 'success' => true, 'message' => 'Airline updated' ], 200 );
		} else {
			return response()->json( [ 'success' => false, 'message' => 'Airline not updated' ], 400 );
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
		$destroyed = $airline->delete();

		if( $destroyed )
		{
			return response()->json( [ 'success' => true, 'message' => 'Airline deleted' ], 200 );
		} else {
			return response()->json( [ 'success' => false, 'message' => 'Airline not deleted' ], 400 );
		}
    }

	/**
	 * Search for airline
	 *
	 * @param $search
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
    public function search( $search )
	{
		$result = Airline::where( 'name', 'like', '%'.$search.'%' )
			->orWhere( 'callsign', 'like', '%'.$search.'%' )
			->orWhere( 'iso', 'like', '%'.$search.'%' )
			->orWhere( 'icao', 'like', '%'.$search.'%' )
			->orWhere( 'id', $search )
			->orderBy( 'name', 'asc' )
			->get();

		return response()->json( $result, 200 );
	}

	private function validation( Request $request )
	{
		$request->validate([
			'name' => 'required|string',
			'callsign' => 'required|string',
			'iso' => 'required|string',
			'icao' => 'required|string'
		]);
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
