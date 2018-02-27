<?php

namespace App\Http\Controllers;

use App\Country;
use App\Currency;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
	public function index() {
		return Currency::all();
	}

	public function store( Request $request ) {
		$store = Currency::create($request->all());

		if( $store ) {
			return response('Currency created', 201);
		} else {
			return response('Currency not created', 400);
		}
	}

	public function edit( Currency $currency ) {
		return response()->json($currency, 200);
	}

	public function update( Request $request, Currency $currency ) {
		$update = $currency->update($request->all());

		if( $update ) {
			return response('Currency updated', 200);
		} else {
			return response('Currency not updated', 400);
		}
	}

	public function destroy( Currency $currency ) {
		$destroy = $currency->delete();

		if( $destroy ) {
			return response('Currency deleted', 200);
		} else {
			return response('Currency not delete', 400);
		}
	}

	public function show( Currency $currency ) {
		return response()->json($currency, 200);
	}

	public function fillDB() {
		$currencies = json_decode( file_get_contents( 'https://openexchangerates.org/api/currencies.json' ) );

		$currenciesData = [];
		foreach( $currencies as $key => $value ) {
			$currenciesData[] = [
				'name' => $value,
				'iso' => $key,
				'created_at' => date('Y-m-d H:i:s'),
				'updated_at' => date('Y-m-d H:i:s')
			];
		}

		Currency::insert($currenciesData);

		return response()->json($currenciesData, 200);
	}
}
