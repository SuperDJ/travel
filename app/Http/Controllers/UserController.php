<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
	/**
	 * Login user
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function login( Request $request )
	{
		// Make normal string of password so it can be validated
		$request->merge( [ 'password' => base64_decode( $request->input( 'password' ) ) ] );

		$request->validate([
			'email' => 'required|email|string|exists:users',
			'password' => 'required|string|min:8'
		]);

		$attempt = Auth::attempt( [
			'email' => $request->input( 'email' ),
			'password' => $request->input( 'password' )
		]);

		if( $attempt )
		{
			$user = Auth::user();
			$token = $user->createToken( config( 'app.name' ) )->accessToken;
			$user->update( [ 'api_token' => $token ] );

			return response()->json( [ 'success' => true, 'token' => $token, 'group' => $user->group->routes ], 200 );
		} else {
			return response()->json( [ 'success' => false, 'message' => 'Email and password combination not found' ], 401 );
		}
	}

	/**
	 * Register user
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function register( Request $request )
	{

		$request->merge([
			'first_name' => ucfirst( $request->input( 'first_name' ) ),
			'last_name' => ucfirst( $request->input( 'last_name' ) ),
			'password' => base64_decode( $request->input( 'password' ) ),
			'passwordRepeat' => base64_decode( $request->input( 'passwordRepeat' ) ),
		]);

		$request->validate([
			'first_name' => 'required|string|min:2',
			'last_name' => 'required|string|min:3',
			'country_id' => 'nullable|exists:countries,id|integer',
			'language_id' => 'nullable|exists:languages,id|integer',
			'currency_id' => 'nullable|exists:currencies,id|integer',
			'email' => 'required|email|string|unique:users',
			'password' => 'required|string|min:8',
			'passwordRepeat' => 'required|string|min:8|same:password'
		]);

		$request->merge( [ 'password' => Hash::make( $request->input( 'password' ) ) ] );
		$user = User::create([
			'first_name' => $request->input( 'first_name' ),
			'last_name' => $request->input( 'last_name' ),
			'email' => $request->input( 'email' ),
			'password' => $request->input( 'password' ),
		]);

		$user->profile()->create([
			'country_id' => $request->input( 'country_id' ),
			'language_id' => $request->input( 'language_id' ),
			'currency_id' => $request->input( 'currency_id' ),
		]);

		if( $user )
		{
			return response()->json( [ 'success' => true, 'message' => 'User registered' ], 200 );
		} else {
			return response()->json( [ 'success' => false, 'message' => 'User not registered' ], 400 );
		}
	}

	/**
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Database\Eloquent\Collection|static[]
	 */
	public function index( Request $request )
	{
		if( !empty( $request ) )
		{
			return User::orderBy( $request->sortBy, $request->descending == 'true' ? 'desc' : 'asc' )
				->with( 'group' )
				->with(['profile' => function( $query ) {
					$query->with('country');
					$query->with('currency');
					$query->with('timezone');
					$query->with('language');
				}])
				->paginate( $request->rowsPerPage );
		} else {
			return User::all();
		}
	}
}