<?php

Route::post( '/users/login', 'UserController@login' )->name( 'user.login' );
Route::post( '/users/register', 'UserController@register' )->name( 'user.register' );

Route::group( ['middleware' => 'auth:api'], function() {
	Route::get( '/users', 'UserController@index' )->name( 'user.index' );
	Route::get( '/users/{user}/edit', 'UserController@edit')->name( 'user.edit' );
	Route::put( '/users/{user}', 'UserController@update' )->name( 'user.update' );

	// Continents
	Route::post( '/continents', 'ContinentController@store' )->name( 'continent.store' );
	Route::get( '/continents/{continent}/edit', 'ContinentController@edit' )->name( 'continent.edit' );
	Route::put( '/continents/{continent}', 'ContinentController@update' )->name( 'continent.update' );
	Route::delete( '/continents/{continent}', 'ContinentController@destroy' )->name( 'continent.destroy' );

	// Currencies
	Route::post( '/currencies', 'CurrencyController@store' )->name( 'currency.store' );
	Route::get( '/currencies/{currency}/edit', 'CurrencyController@edit' )->name( 'currency.edit' );
	Route::put( '/currencies/{currency}', 'CurrencyController@update' )->name( 'currency.update' );
	Route::delete( '/currencies/{currency}', 'CurrencyController@destroy' )->name( 'currency.destroy' );

	// Languages
	Route::post( '/languages', 'LanguageController@store' )->name( 'language.store' );
	Route::get( '/languages/{language}/edit', 'LanguageController@edit' )->name( 'language.edit' );
	Route::put( '/languages/{language}', 'LanguageController@update' )->name( 'language.update' );
	Route::delete( '/languages/{language}', 'LanguageController@destroy' )->name( 'language.destroy' );

	// Countries
	Route::post( '/countries', 'CountryController@store' )->name( 'country.store' );
	Route::get( '/countries/{country}/edit', 'CountryController@edit' )->name( 'country.edit' );
	Route::put( '/countries/{country}', 'CountryController@update' )->name( 'country.update' );
	Route::delete( '/countries/{country}', 'CountryController@destroy' )->name( 'country.destroy' );

	// Timezones
	Route::post( '/timezones', 'TimezoneController@store' )->name( 'timezone.store' );
	Route::get( '/timezones/{timezone}/edit', 'TimezoneController@edit' )->name( 'timezone.edit' );
	Route::put( '/timezones/{timezone}', 'TimezoneController@update' )->name( 'timezone.update' );
	Route::delete( '/timezones/{timezone}', 'TimezoneController@destroy' )->name( 'timezone.destroy' );

	// Cities
	Route::post( '/cities', 'CityController@store' )->name( 'city.store' );
	Route::put( '/cities/{city}', 'CityController@update' )->name( 'city.update' );
	Route::delete( '/cities/{city}', 'CityController@destroy' )->name( 'city.destroy' );

	// Airports
	Route::post( '/airports', 'AirportController@store' )->name( 'airport.store' );
	Route::get( '/airports/{airport}/edit', 'AirportController@edit' )->name( 'airport.edit' );
	Route::put( '/airports/{airport}', 'AirportController@update' )->name( 'airport.update' );
	Route::delete( '/airports/{airport}', 'AirportController@destroy' )->name( 'airport.destroy' );

	// Airlines
	Route::post( '/airlines', 'AirlineController@store' )->name( 'airline.store' );
	Route::get( '/airlines/{airline}/edit', 'AirlineController@edit' )->name( 'airline.edit' );
	Route::put( '/airlines/{airline}', 'AirlineController@update' )->name( 'airline.update' );
	Route::delete( '/airlines/{airline}', 'AirlineController@destroy' )->name( 'airline.destroy' );

	// Roles
	Route::get( '/roles', 'RoleController@index' )->name( 'role.index' );
	Route::post( '/roles', 'RoleController@store' )->name( 'role.store' );
	Route::get( '/roles/{search}/search', 'RoleController@search' )->name( 'role.search' );
	Route::get( '/roles/{role}/edit', 'RoleController@edit' )->name( 'role.edit' );
	Route::put( '/roles/{role}', 'RoleController@update' )->name( 'role.update' );
	Route::delete( '/roles/{role}', 'RoleController@destroy' )->name( 'role.destroy' );

	// Permissions
	Route::get( '/permissions', 'PermissionController@index' )->name( 'permission.index' );
	Route::get( '/permissions/routes', 'PermissionController@routes' )->name( 'permission.routes' );
	Route::post( '/permissions', 'PermissionController@store' )->name( 'permission.store' );
	Route::get( '/permissions/{search}/search', 'PermissionController@search' )->name( 'permission.search' );
	Route::get( '/permissions/{permission}/edit', 'PermissionController@edit' )->name( 'permission.edit' );
	Route::put( '/permissions/{permission}', 'PermissionController@update' )->name( 'permission.update' );
	Route::delete( '/permissions/{permission}', 'PermissionController@destroy' )->name( 'permission.destroy' );
});

// Continents
Route::get( '/continents', 'ContinentController@index' )->name( 'continent.index' );
Route::get( '/continents/db', 'ContinentController@fillDB' )->name( 'continent.database' );
Route::get( '/continents/{search}/search', 'ContinentController@search' )->name( 'continent.search' );
Route::get( '/continents/{continent}', 'ContinentController@show' )->name( 'continent.show' );
Route::get( '/continents/{continent}/top-destinations', 'ContinentController@topDestinations' )->name( 'continent.index' );

// Currencies
Route::get( '/currencies', 'CurrencyController@index' )->name( 'currency.index' );
Route::get( '/currencies/db', 'CurrencyController@fillDB' )->name( 'currency.database' );
Route::get( '/currencies/{search}/search', 'CurrencyController@search' )->name( 'currency.search' );
Route::get( '/currencies/{currency}', 'CurrencyController@show' )->name( 'currency.show' );

// Languages
Route::get( '/languages', 'LanguageController@index' )->name( 'language.index' );
Route::get( '/languages/db', 'LanguageController@fillDB' )->name( 'language.database' );
Route::get( '/languages/{search}/search', 'LanguageController@search' )->name( 'language.search' );
Route::get( '/languages/{language}', 'LanguageController@show' )->name( 'language.show' );

// Countries
Route::get( '/countries', 'CountryController@index' )->name( 'country.index' );
Route::get( '/countries/db', 'CountryController@fillDB' )->name( 'country.database' );
Route::get( '/countries/{search}/search', 'CountryController@search' )->name( 'country.search' );
Route::get( '/countries/{country}', 'CountryController@show' )->name( 'country.show' );

// Timezones
Route::get( '/timezones', 'TimezoneController@index' )->name( 'timezone.index' );
Route::get( '/timezones/db', 'TimezoneController@fillDB' )->name( 'timezone.database' );
Route::get( '/timezones/{search}/search', 'TimezoneController@search' )->name( 'timezone.search' );
Route::get( '/timezones/{timezone}', 'TimezoneController@show' )->name( 'timezone.show' );

// Cities
Route::get( '/cities', 'CityController@index' )->name( 'city.index' );
Route::get( '/cities/{search}/search', 'CityController@search' )->name( 'city.search' );
Route::get( '/cities/db', 'CityController@fillDB' )->name( 'city.database' );
Route::get( '/cities/{city}', 'CityController@show' )->name( 'city.show' );

// Airports
Route::get( '/airports', 'AirportController@index' )->name( 'airport.index' );
Route::get( '/airports/db', 'AirportController@fillDB' )->name( 'airport.database' );
Route::get( '/airports/{search}/search', 'AirportController@search' )->name( 'airport.search' );
Route::get( '/airports/{airport}', 'AirportController@show' )->name( 'airport.show' );

// Flights
Route::post( '/flights/browse-quotes', 'FlightController@browseQuotes' )->name( 'flight.browseQuotes' );
Route::post( '/flights/browse-routes', 'FlightController@browseRoutes' )->name( 'flight.browseRoutes' );
Route::post( '/flights/browse-dates', 'FlightController@browseDates' )->name( 'flight.browseDates' );
Route::post( '/flights/browse-dates-grid', 'FlightController@browseDatesGrid' )->name( 'flight.browseDatesGrid' );
Route::post( '/flights/session', 'FlightController@createSession' )->name( 'flight.createSession' );

// Airlines
Route::get( '/airlines', 'AirlineController@index' )->name( 'airline.index' );
Route::get( '/airlines/db', 'AirlineController@fillDB' )->name( 'airline.database' );
Route::get( '/airlines/{search}/search', 'AirlineController@search' )->name( 'airline.search' );
Route::get( '/airlines/{airline}', 'AirlineController@show' )->name( 'airline.show' );