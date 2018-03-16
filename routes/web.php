<?php

Route::get( '/', function () {
    return view( 'index' );
});

// Make sure all vue routes are redirected to index view
Route::get( '/{vue?}', function() {
	return view( 'index' );
})->where( 'vue', '[\/\w\.-]*' );