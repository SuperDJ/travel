export default
{
	message( state, message )
	{
		state.message = message;
	},

	success( state, success )
	{
		state.success = success;
	},

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