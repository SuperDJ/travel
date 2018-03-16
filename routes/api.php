<?php

use Illuminate\Http\Request;

Route::middleware( 'auth:api' )->get( '/user', function( Request $request ) {
    return $request->user();
});

Route::post( 'login', 'UserController@login' );
Route::post( 'register', 'UserController@register' );

Route::group( ['middleware' => 'auth:api'], function() {
	Route::get( 'users', 'UserController@index' );
});

// Continents
Route::get( '/continents', 'ContinentController@index' );
Route::get( '/continents/db', 'ContinentController@fillDB' );
Route::get( '/continents/{search}/search', 'ContinentController@search' );
Route::post( '/continents', 'ContinentController@store' );
Route::get( '/continents/{continent}', 'ContinentController@show' );
Route::get( '/continents/{continent}/edit', 'ContinentController@edit' );
Route::get( '/continents/{continent}/top-destinations', 'ContinentController@topDestinations' );
Route::put( '/continents/{continent}', 'ContinentController@update' );
Route::delete( '/continents/{continent}', 'ContinentController@destroy' );

// Currencies
Route::get( '/currencies', 'CurrencyController@index' );
Route::get( '/currencies/db', 'CurrencyController@fillDB' );
Route::get( '/currencies/{search}/search', 'CurrencyController@search' );
Route::post( '/currencies', 'CurrencyController@store' );
Route::get( '/currencies/{currency}', 'CurrencyController@show' );
Route::get( '/currencies/{currency}/edit', 'CurrencyController@edit' );
Route::put( '/currencies/{currency}', 'CurrencyController@update' );
Route::delete( '/currencies/{currency}', 'CurrencyController@destroy' );

// Languages
Route::get( '/languages', 'LanguageController@index' );
Route::get( '/languages/db', 'LanguageController@fillDB' );
Route::get( '/languages/{search}/search', 'LanguageController@search' );
Route::post( '/languages', 'LanguageController@store' );
Route::get( '/languages/{language}', 'LanguageController@show' );
Route::get( '/languages/{language}/edit', 'LanguageController@edit' );
Route::put( '/languages/{language}', 'LanguageController@update' );
Route::delete( '/languages/{language}', 'LanguageController@destroy' );

// Countries
Route::get( '/countries', 'CountryController@index' );
Route::get( '/countries/db', 'CountryController@fillDB' );
Route::get( '/countries/{search}/search', 'CountryController@search' );
Route::post( '/countries', 'CountryController@store' );
Route::get( '/countries/{country}', 'CountryController@show' );
Route::get( '/countries/{country}/edit', 'CountryController@edit' );
Route::put( '/countries/{country}', 'CountryController@update' );
Route::delete( '/countries/{country}', 'CountryController@destroy' );

// Timezones
Route::get( '/timezones', 'TimezoneController@index' );
Route::get( '/timezones/db', 'TimezoneController@fillDB' );
Route::post( '/timezones', 'TimezoneController@store' );
Route::get( '/timezones/{timezone}', 'TimezoneController@show' );
Route::get( '/timezones/{timezone}/edit', 'TimezoneController@edit' );
Route::put( '/timezones/{timezone}', 'TimezoneController@update' );
Route::delete( '/timezones/{timezone}', 'TimezoneController@destroy' );

// Cities
Route::get( '/cities', 'CityController@index' );
Route::get( '/cities/{search}/search', 'CityController@search' );
Route::get( '/cities/db', 'CityController@fillDB' );
Route::post( '/cities', 'CityController@store' );
Route::get( '/cities/{city}', 'CityController@show' );
Route::get( '/cities/{city}/edit', 'CityController@edit' );
Route::put( '/cities/{city}', 'CityController@update' );
Route::delete( '/cities/{city}', 'CityController@destroy' );

// Airports
Route::get( '/airports', 'AirportController@index' );
Route::get( '/airports/db', 'AirportController@fillDB' );
Route::post( '/airports', 'AirportController@store' );
Route::get( '/airports/{search}/search', 'AirportController@search' );
Route::get( '/airports/{airport}', 'AirportController@show' );
Route::get( '/airports/{airport}/edit', 'AirportController@edit' );
Route::put( '/airports/{airport}', 'AirportController@update' );
Route::delete( '/airports/{airport}', 'AirportController@destroy' );

// Flights
Route::post( '/flights/browse-quotes', 'FlightController@browseQuotes' );
Route::post( '/flights/browse-routes', 'FlightController@browseRoutes' );
Route::post( '/flights/browse-dates', 'FlightController@browseDates' );
Route::post( '/flights/browse-dates-grid', 'FlightController@browseDatesGrid' );
Route::post( '/flights/session', 'FlightController@createSession' );

// Airlines
Route::get( '/airlines', 'AirlineController@index' );
Route::get( '/airlines/db', 'AirlineController@fillDB' );
Route::post( '/airlines', 'AirlineController@store' );
Route::get( '/airlines/{search}/search', 'AirlineController@search' );
Route::get( '/airlines/{airline}', 'AirlineController@show' );
Route::get( '/airlines/{airline}/edit', 'AirlineController@edit' );
Route::put( '/airlines/{airline}', 'AirlineController@update' );
Route::delete( '/airlines/{airline}', 'AirlineController@destroy' );