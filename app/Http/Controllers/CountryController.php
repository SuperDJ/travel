<?php

namespace App\Http\Controllers;

use App\Continent;
use App\Currency;
use App\Language;
use App\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \App\Country[]|\Illuminate\Database\Eloquent\Collection
	 */
	public function index( Request $request )
	{
		if( !empty( $request ) && count( $request->all() ) > 1 )
		{
			return Country::orderBy( $request->sortBy, $request->descending == 'true' ? 'desc' : 'asc' )
				->with( 'continent' )
				->with( 'currency' )
				->with( 'language' )
				->withCount( 'cities' )
				->withCount( 'profile' )
				->paginate( $request->rowsPerPage );
		} else {
			return Country::all();
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

		$stored = Country::create( $request->all() );

		if( $stored )
		{
			return response()->json( [ 'success' => true, 'message' => 'Country created' ], 201 );
		} else {
			return response()->json( [ 'success' => false, 'message' => 'Country not created' ], 400 );
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param \App\Country $country
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function show( Country $country )
	{
		return response()->json( $country, 200 );
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param \App\Country $country
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function edit( Country $country )
	{
		return response()->json( $country, 200 );
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param \App\Country              $country
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function update( Request $request, Country $country )
	{
		$this->validation( $request );

		$updated = $country->update( $request->all() );

		if( $updated )
		{
			return response()->json( [ 'success' => true, 'message' => 'Country updated' ], 200 );
		} else {
			return response()->json( [ 'success' => false, 'message' => 'Country not updated' ], 400 );
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param \App\Country $country
	 *
	 * @return \Illuminate\Http\Response
	 * @throws \Exception
	 */
	public function destroy( Country $country )
	{
		$destroyed = $country->delete();

		if( $destroyed )
		{
			return response()->json( [ 'success' => true, 'message' => 'Country deleted' ], 200 );
		} else {
			return response()->json( [ 'success' => false, 'message' => 'Country not deleted' ], 400 );
		}
	}

	/**
	 * Search country
	 *
	 * @param $search
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function search( $search )
	{
		$result = Country::where('name', 'like', '%'.$search.'%')
			->orWhere('id', $search)
			->with('language')
			->with('currency')
			->orderBy('name', 'asc')
			->get();

		return response()->json( $result, 200 );
	}

	/**
	 * @param \Illuminate\Http\Request $request
	 */
	private function validation( Request $request )
	{
		$request->validate([
			'name' => 'required',
			'iso' => $request->input('id') ? [ 'required', Rule::unique( 'country' )->ignore($request->input( 'id' ) ) ] : 'required|unique:countries',
			'continent_id' => 'required|integer|exists:continents,id',
			'currency_id' => 'required|integer|exists:currencies,id',
			'language_id' => 'required|integer|exists:languages,id'
		]);
	}

	public function fillDB()
	{
		$data = [];
		$response = json_decode( file_get_contents( 'https://raw.githubusercontent.com/annexare/Countries/master/data/countries.json' ) );

		$countries = Country::count();

		if( $countries === 0 )
		{
			foreach( $response as $key => $value )
			{
				$currency = $value->currency;
				if( strpos( $currency, ',' ) !== false )
				{
					$currencies = explode( ',', $currency );

					$firstOccurrence = '';
					foreach( $currencies as $int => $val )
					{
						if( empty( $firstOccurrence ) && Currency::where( 'iso', $val )->count() > 0 )
						{
							$currency = $val;
						}
					}
				}

				$data[] = [
					'name'         => $value->name,
					'continent_id' => Continent::where( 'iso', $value->continent )->value( 'id' ),
					'currency_id'  => Currency::where( 'iso', $currency )->value( 'id' ) ?? null,
					'language_id'  => !empty( $value->languages ) ? Language::where( 'iso', $value->languages[0] )->value( 'id' ) : null,
					'iso'          => $key,
					'created_at'   => date( 'Y-m-d H:i:s' ),
					'updated_at'   => date( 'Y-m-d H:i:s' )
				];
			}

			// Add all countries from 1st source
			Country::insert( $data );
		}

		if( $countries > 0 )
		{
			// Add all additional countries
			$response = json_decode( file_get_contents( 'http://partners.api.skyscanner.net/apiservices/geo/v1.0?apikey='.config( 'app.skyscanner' ) ) );

			foreach( $response as $array )
			{
				foreach( $array as $continents )
				{
					foreach( $continents->Countries as $countries )
					{
						// Filter countries
						$countryName = str_replace( 'St ', 'Sint ', $countries->Name );
						$countryName = str_replace( 'St. ', 'Saint ', $countryName );
						$countryName = str_replace( 'US ', 'U.S. ', $countryName );
						$countryName = str_replace( '(', '[', $countryName );
						$countryName = str_replace( ')', ']', $countryName );

						switch( $countryName )
						{
							case 'S. Georgia and S. Sandwich Isls.':
								$countryName = 'South Georgia and the South Sandwich Islands';
								break;
							case 'Vatican City State [Holy See]':
								$countryName = 'Vatican City';
								break;
							case 'DR Congo':
								$countryName = 'Democratic Republic of the Congo';
								break;
							case 'Congo':
								$countryName = 'Republic of the Congo';
								break;
							case 'Republic of Macedonia':
								$countryName = 'Macedonia';
								break;
							case 'Svalbard and Jan Mayen Islands':
							case 'Wallis and Futuna Islands':
								$countryName = str_replace( ' Islands', '', $countryName );
								break;
							case 'Heard and McDonald Islands':
								$countryName = 'Heard Island and McDonald Islands';
								break;
							case 'Myanmar':
								$countryName = 'Myanmar [Burma]';
								break;
							case 'Pitcairn':
								$countryName = 'Pitcairn Islands';
								break;
						}

						$country = Country::where( 'name', 'like', $countryName )->first();

						// If country doesn't exists create it
						if( empty( $country ) )
						{
							$createCountries = [ 'Netherlands Antilles', 'Caribbean Netherlands', 'Crimea', 'Macau', 'Palestinian Territory' ];

							if( !in_array( $countryName, $createCountries ) )
							{
								die( 'New country found: "'.$countryName.'"' );
							}

							$continentId = '';
							switch( $countryName )
							{
								case 'Netherlands Antilles':
								case 'Caribbean Netherlands':
									$continentId = Continent::where( 'name', 'South America' )->value( 'id' );
									break;
								case 'Crimea':
									$continentId = Continent::where( 'name', 'Europe' )->value( 'id' );
									break;
								case 'Macau':
								case 'Palestinian Territory':
									$continentId = Continent::where( 'name', 'Asia' )->value( 'id' );
									break;
							}

							$currencyId = Currency::where( 'iso', $countries->CurrencyId )->value( 'id' ) ?? null;
							$languageId = !empty( $countries->LangaugeId ) ? Language::where( 'iso', strtolower( $countries->LanguageId ) )->value( 'id' ) : null;

							$data[] = [
								'name'         => $countryName,
								'continent_id' => $continentId,
								'currency_id'  => $currencyId,
								'language_id'  => $languageId,
								'iso'          => $countries->Id,
								'created_at'   => date( 'Y-m-d H:i:s' ),
								'updated_at'   => date( 'Y-m-d H:i:s' )
							];

							Country::create( [
								'name'         => $countryName,
								'continent_id' => $continentId,
								'currency_id'  => $currencyId,
								'language_id'  => $languageId,
								'iso'          => $countries->Id,
								'created_at'   => date( 'Y-m-d H:i:s' ),
								'updated_at'   => date( 'Y-m-d H:i:s' )
							] );
						}
					}
				}
			}
		}

		return response()->json( $data, 200 );
	}
}
