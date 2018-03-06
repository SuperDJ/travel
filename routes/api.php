<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Continents
Route::get('/continents', 'ContinentController@index');
Route::get('/continents/db', 'ContinentController@fillDB');
Route::post('/continents', 'ContinentController@store');
Route::get('/continents/{continent}', 'ContinentController@show');
Route::get('/continents/{continent}/edit', 'ContinentController@edit');
Route::get('/continents/{continent}/top-destinations', 'ContinentController@topDestinations');
Route::put('/continents/{continent}', 'ContinentController@update');
Route::delete('/continents/{continent}', 'ContinentController@destroy');

// Currencies
Route::get('/currencies', 'CurrencyController@index');
Route::get('/currencies/db', 'CurrencyController@fillDB');
Route::post('/currencies', 'CurrencyController@store');
Route::get('/currencies/{currency}', 'CurrencyController@show');
Route::get('/currencies/{currency}/edit', 'CurrencyController@edit');
Route::put('/currencies/{currency}', 'CurrencyController@update');
Route::delete('/currencies/{currency}', 'CurrencyController@destroy');

// Languages
Route::get('/languages', 'LanguageController@index');
Route::get('/languages/db', 'LanguageController@fillDB');
Route::post('/languages', 'LanguageController@store');
Route::get('/languages/{language}', 'LanguageController@show');
Route::get('/languages/{language}/edit', 'LanguageController@edit');
Route::put('/languages/{language}', 'LanguageController@update');
Route::delete('/languages/{language}', 'LanguageController@destroy');

// Countries
Route::get('/countries', 'CountryController@index');
Route::get('/countries/db', 'CountryController@fillDB');
Route::post('/countries', 'CountryController@store');
Route::get('/countries/{country}', 'CountryController@show');
Route::get('/countries/{country}/edit', 'CountryController@edit');
Route::put('/countries/{country}', 'CountryController@update');
Route::delete('/countries/{country}', 'CountryController@destroy');

// Timezones
Route::get('/timezones', 'TimezoneController@index');
Route::get('/timezones/db', 'TimezoneController@fillDB');
Route::post('/timezones', 'TimezoneController@store');
Route::get('/timezones/{timezone}', 'TimezoneController@show');
Route::get('/timezones/{timezone}/edit', 'TimezoneController@edit');
Route::put('/timezones/{timezone}', 'TimezoneController@update');
Route::delete('/timezones/{timezone}', 'TimezoneController@destroy');

// Cities
Route::get('/cities', 'CityController@index');
Route::get('/cities/db', 'CityController@fillDB');
Route::post('/cities', 'CityController@store');
Route::get('/cities/{city}', 'CityController@show');
Route::get('/cities/{city}/edit', 'CityController@edit');
Route::put('/cities/{city}', 'CityController@update');
Route::delete('/cities/{city}', 'CityController@destroy');

// Airports
Route::get('/airports', 'AirportController@index');
Route::get('/airports/db', 'AirportController@fillDB');
Route::post('/airports', 'AirportController@store');
Route::get('/airports/{search}/search', 'AirportController@search');
Route::get('/airports/{airport}', 'AirportController@show');
Route::get('/airports/{airport}/edit', 'AirportController@edit');
Route::put('/airports/{airport}', 'AirportController@update');
Route::delete('/airports/{airport}', 'AirportController@destroy');

// Flights
Route::post('/flights/browse-quotes', 'FlightController@browseQuotes');
Route::post('/flights/browse-routes', 'FlightController@browseQuotes');
Route::post('/flights/browse-quotes', 'FlightController@browseQuotes');
Route::post('/flights/browse-quotes', 'FlightController@browseQuotes');
Route::post('/flights/browse-quotes', 'FlightController@browseQuotes');