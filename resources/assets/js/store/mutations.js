export default
{
	/**
	 * Set the intial store
	 */
	initial( state )
	{
		if( sessionStorage.getItem( 'loggedIn' ) && sessionStorage.getItem( 'token' ) )
		{
			state.user.token = sessionStorage.getItem( 'token' );
			state.user.loggedIn = sessionStorage.getItem( 'loggedIn' );
		}
	},

	/**
	 * Set a custom message
	 *
	 * @param state
	 * @param message
	 */
	message( state, message )
	{
		state.message = message;
	},

	/**
	 * Store request success
	 *
	 * @param state
	 * @param success
	 */
	success( state, success )
	{
		state.success = success;
	},

	/**
	 * Store request errors
	 *
	 * @param state
	 * @param errors
	 */
	errors( state, errors )
	{
		state.errors = errors;
	},

	/**
	 * Set the current date
	 * This makes sure a user can't search before this date
	 * @param state
	 */
	currentDate( state ) {
		let date = new Date(),
			dd = date.getDate(),
			mm = date.getMonth() + 1,
			yy = date.getFullYear();

		if( dd < 10 ) {
			dd = `0${dd}`;
		}

		if( mm < 10 ) {
			mm = `0${mm}`;
		}

		state.currentDate = `${yy}-${mm}-${dd}`;
	}
}