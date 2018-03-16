export default
{
	state: {
		all: {},
		data: {},
		loggedIn: false,
	},

	mutations: {

		/**
		 * Set user to logged in
		 * @param state
		 */
		userLogin( state ) {
			state.loggedIn = true;
		},

		/**
		 * Set user to logged out
		 *
		 * @param state
		 */
		userLogout( state )
		{
			state.loggedIn = false;
		}
	},

	actions: {
		/**
		 * Login user
		 *
		 * @param context
		 * @param data
		 */
		userLogin( context, data )
		{

		},

		/**
		 * Register user
		 *
		 * @param context
		 * @param data
		 */
		userRegister( context, data )
		{
		 	fetch( '/api/user/register', {
		 		headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify( data )
			})
				.then( response => {
					return response.json();
				})
				.then( response => {

				})
				.catch( error => {
					console.error( 'userRegister', error );
				});
		}
	},

	getters: {
		/**
		 * Check if the user is logged in
		 * @param state
		 * @returns {boolean}
		 */
		userLoggedIn( state )
		{
			return state.loggedIn;
		},

		/**
		 * Return all data or specific data
		 *
		 * @param state
		 * @param detail
		 * @returns {*}
		 */
		userData( state, detail = '' )
		{
			if( detail.length > 1 )
			{
				return state.data[detail];
			} else {
				return state.data;
			}
		}
	}
}