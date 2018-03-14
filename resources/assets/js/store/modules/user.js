export default
{
	state: {
		all: {},
		email: '',
		password: '',
		data: {},
		loggedIn: false,
	},

	mutations: {
		/**
		 * Set user email
		 *
		 * @param state
		 * @param email
		 */
		userEmail( state, email )
		{
			state.email = email;
		},

		/**
		 * Set password and encode in base64
		 *
		 * @param state
		 * @param password
		 */
		userPassword( state, password )
		{
			state.password = window.btoa( password );
		},

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

		}
	},

	getters: {
		/**
		 * Get email
		 *
		 * @param state
		 * @returns {string|*}
		 */
		userEmail( state )
		{
			return state.email;
		},

		/**
		 * Get password and decode from base64
		 * @param state
		 * @returns {string}
		 */
		userPassword( state )
		{
			return window.atob( state.password );
		},

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