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

Route::get('/continents', 'ContinentController@index');
Route::get('/continents/db', 'ContinentController@fillDB');
Route::post('/continents', 'ContinentController@store');
Route::get('/continents/{continent}', 'ContinentController@show');
Route::get('/continents/{continent}/edit', 'ContinentController@edit');
Route::put('/continents/{continent}', 'ContinentController@update');
Route::delete('/continents/{continent}', 'ContinentController@destroy');

Route::get('/countries', 'CountryController@index');
Route::get('/countries/db', 'CountryController@fillDB');
Route::post('/countries', 'CountryController@store');
Route::get('/countries/{country}', 'CountryController@show');
Route::get('/countries/{country}/edit', 'CountryController@edit');
Route::put('/countries/{country}', 'CountryController@update');
Route::delete('/countries/{country}', 'CountryController@destroy');

Route::get('/states', 'StateController@index');
Route::get('/states/db', 'StateController@fillDB');
Route::post('/states', 'StateController@store');
Route::get('/states/{state}', 'StateController@show');
Route::get('/states/{state}/edit', 'StateController@edit');
Route::put('/states/{state}', 'StateController@update');
Route::delete('/states/{state}', 'StateController@destroy');

Route::get('/timezones', 'TimezoneController@index');
Route::get('/timezones/db', 'TimezoneController@fillDB');
Route::post('/timezones', 'TimezoneController@store');
Route::get('/timezones/{timezone}', 'TimezoneController@show');
Route::get('/timezones/{timezone}/edit', 'TimezoneController@edit');
Route::put('/timezones/{timezone}', 'TimezoneController@update');
Route::delete('/timezones/{timezone}', 'TimezoneController@destroy');

Route::get('/currencies', 'CurrencyController@index');
Route::get('/currencies/db', 'CurrencyController@fillDB');
Route::get('/currencies/connect', 'CurrencyController@connectCountries');
Route::post('/currencies', 'CurrencyController@store');
Route::get('/currencies/{currency}', 'CurrencyController@show');
Route::get('/currencies/{currency}/edit', 'CurrencyController@edit');
Route::put('/currencies/{currency}', 'CurrencyController@update');
Route::delete('/currencies/{currency}', 'CurrencyController@destroy');