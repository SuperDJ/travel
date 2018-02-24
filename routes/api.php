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
Route::put('/continents/{continent}', 'ContinentController@update');
Route::delete('/continents/{continent}', 'ContinentController@destroy');

// Countries
Route::get('/countries', 'CountryController@index');
Route::get('/countries/db', 'CountryController@fillDB');
Route::post('/countries', 'CountryController@store');
Route::get('/countries/{country}', 'CountryController@show');
Route::get('/countries/{country}/edit', 'CountryController@edit');
Route::put('/countries/{country}', 'CountryController@update');
Route::delete('/countries/{country}', 'CountryController@destroy');

// States
Route::get('/states', 'StateController@index');
Route::get('/states/db', 'StateController@fillDB');
Route::post('/states', 'StateController@store');
Route::get('/states/{state}', 'StateController@show');
Route::get('/states/{state}/edit', 'StateController@edit');
Route::put('/states/{state}', 'StateController@update');
Route::delete('/states/{state}', 'StateController@destroy');

// Timezones
Route::get('/timezones', 'TimezoneController@index');
Route::get('/timezones/db', 'TimezoneController@fillDB');
Route::post('/timezones', 'TimezoneController@store');
Route::get('/timezones/{timezone}', 'TimezoneController@show');
Route::get('/timezones/{timezone}/edit', 'TimezoneController@edit');
Route::put('/timezones/{timezone}', 'TimezoneController@update');
Route::delete('/timezones/{timezone}', 'TimezoneController@destroy');

// Currencies
Route::get('/currencies', 'CurrencyController@index');
Route::get('/currencies/db', 'CurrencyController@fillDB');
Route::get('/currencies/connect', 'CurrencyController@connectCountries');
Route::post('/currencies', 'CurrencyController@store');
Route::get('/currencies/{currency}', 'CurrencyController@show');
Route::get('/currencies/{currency}/edit', 'CurrencyController@edit');
Route::put('/currencies/{currency}', 'CurrencyController@update');
Route::delete('/currencies/{currency}', 'CurrencyController@destroy');

// Counties
Route::get('/counties', 'CountyController@index');
Route::get('/counties/db', 'CountyController@fillDB');
Route::post('/counties', 'CountyController@store');
Route::get('/counties/{county}', 'CountyController@show');
Route::get('/counties/{county}/edit', 'CountyController@edit');
Route::put('/counties/{county}', 'CountyController@update');
Route::delete('/counties/{county}', 'CountyController@destroy');

// Cities
Route::get('/cities', 'CityController@index');
Route::get('/cities/db', 'CityController@fillDB');
Route::post('/cities', 'CityController@store');
Route::get('/cities/{city}', 'CityController@show');
Route::get('/cities/{city}/edit', 'CityController@edit');
Route::put('/cities/{city}', 'CityController@update');
Route::delete('/cities/{city}', 'CityController@destroy');