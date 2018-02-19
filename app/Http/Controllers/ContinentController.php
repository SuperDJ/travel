<?php

namespace App\Http\Controllers;

use App\Continent;
use Illuminate\Http\Request;

class ContinentController extends Controller
{
    public function index() {
    	return Continent::all();
	}

	public function store( Request $request ) {
    	$store = Continent::create($request->all());

    	if( $store ) {
    		return response('Continent created', 201);
		} else {
    		return response('Continent not created', 400);
		}
	}

	public function edit( Continent $continent ) {
    	return response()->json($continent, 200);
	}

	public function update( Request $request, Continent $continent ) {
    	$update = $continent->update($request->all());

    	if( $update ) {
    		return response('Continent updated', 200);
		} else {
    		return response('Continent not updated', 400);
		}
	}

	public function destroy( Continent $continent ) {
    	$destroy = $continent->delete();

    	if( $destroy ) {
    		return response('Continent deleted', 200);
		} else {
    		return response('Continent not delete', 400);
		}
	}

	public function show( Continent $continent ) {
    	return response()->json($continent, 200);
	}

	public function fillDB() {
    	$response = json_decode( file_get_contents( 'http://www.geonames.org/childrenJSON?geonameId=6295630&style=long' ) );

    	foreach( $response->geonames as $key => $value ) {
    		Continent::create([
    			'name' => $value->name,
				'latitude' => $value->lat,
				'longitude' => $value->lng,
				'geonames_id' => $value->geonameId,
			]);
		}

		return response('Continents added');
	}
}
