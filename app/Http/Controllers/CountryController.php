<?php

namespace App\Http\Controllers;

use App\Continent;
use App\Currency;
use App\Language;
use App\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
	public function index() {
		return Country::all();
	}

	public function store( Request $request ) {
		$store = Country::create($request->all());

		if( $store ) {
			return response('Country created', 201);
		} else {
			return response('Country not created', 400);
		}
	}

	public function edit( Country $country ) {
		return response()->json($country, 200);
	}

	public function update( Request $request, Country $country ) {
		$update = $country->update($request->all());

		if( $update ) {
			return response('Country updated', 200);
		} else {
			return response('Country not updated', 400);
		}
	}

	public function destroy( Country $country ) {
		$destroy = $country->delete();

		if( $destroy ) {
			return response('Country deleted', 200);
		} else {
			return response('Country not delete', 400);
		}
	}

	public function show( Country $country ) {
		return response()->json($country, 200);
	}

	public function fillDB() {
		$data = [];
		$response = json_decode( file_get_contents( 'https://raw.githubusercontent.com/annexare/Countries/master/data/countries.json' ) );

		foreach( $response as $key => $value ) {
			$currency = $value->currency;
			if( strpos( $currency, ',' ) !== false ) {
				$currencies = explode(',', $currency);

				$firstOccurrence = '';
				foreach( $currencies as $int => $val ) {
					if( empty( $firstOccurrence ) && Currency::where( 'iso', $val )->count() > 0 ) {
						$currency = $val;
					}
				}
			}

			$data[] = [
				'name' => $value->name,
				'continents_id' => Continent::where( 'iso', $value->continent )->first()->id,
				'currencies_id' => Currency::where( 'iso', $currency )->first()->id ?? null,
				'languages_id' => !empty( $value->languages ) ? Language::where( 'iso', $value->languages[0] )->first()->id : null,
				'iso' => $key,
				'created_at' => date( 'Y-m-d H:i:s' ),
				'updated_at' => date( 'Y-m-d H:i:s' )
			];
		}

		Country::insert($data);

		return response()->json($data, 200);
	}
}
