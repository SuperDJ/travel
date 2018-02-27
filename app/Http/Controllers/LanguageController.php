<?php

namespace App\Http\Controllers;

use App\Language;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
	public function index() {
		return Language::all();
	}

	public function store( Request $request ) {
		$store = Language::create($request->all());

		if( $store ) {
			return response('Language created', 201);
		} else {
			return response('Language not created', 400);
		}
	}

	public function edit( Language $language ) {
		return response()->json($language, 200);
	}

	public function update( Request $request, Language $language ) {
		$update = $language->update($request->all());

		if( $update ) {
			return response('Language updated', 200);
		} else {
			return response('Language not updated', 400);
		}
	}

	public function destroy( Language $language ) {
		$destroy = $language->delete();

		if( $destroy ) {
			return response('Language deleted', 200);
		} else {
			return response('Language not delete', 400);
		}
	}

	public function show( Language $language ) {
		return response()->json($language, 200);
	}

	public function fillDB() {
		$data = [];
		$response = json_decode( file_get_contents( 'https://raw.githubusercontent.com/annexare/Countries/master/data/languages.json' ) );

		foreach( $response as $key => $value ) {
			$data[] = [
				'name' => $value->name,
				'iso' => $key,
				'created_at' => date('Y-m-d H:i:s'),
				'updated_at' => date('Y-m-d H:i:s')
			];
		}

		Language::insert($data);

		return response()->json($data, 200);
	}
}
