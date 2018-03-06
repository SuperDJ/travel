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
}
