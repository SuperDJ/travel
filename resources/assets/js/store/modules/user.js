export default
{
	state: {
		all: [],
		data: {},
		loggedIn: !!sessionStorage.getItem( 'token' ),
		group: sessionStorage.getItem( 'group' ),
		user: {}
	},

	mutations: {
		/**
		 * Set all users
		 *
		 * @param state
		 * @param users
		 */
		userIndex( state, users )
		{
			state.all = users;
		},

		/**
		 * Set user to logged in
		 *
		 * @param state
		 * @param user
		 */
		userLogin( state, user )
		{
			state.user = user;
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
			sessionStorage.removeItem( 'token' );
			sessionStorage.removeItem( 'group' );
		},

		/**
		 * Set user profile
		 *
		 * @param state
		 * @param user
		 */
		userProfile( state, user )
		{
			state.user = user;
		}
	},

	actions: {
		/**
		 * Get all users
		 *
		 * @param context
		 * @param pagination
		 */
		userIndex( context, pagination )
		{
			return fetch( `/api/users?${Object.keys(pagination).map(key => key + '=' + pagination[key]).join('&')}`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				},
				method: 'GET'
			})
				.then( response => response.json() )
				.then( response => context.commit( 'userIndex', response ) )
				.catch( error => console.error( 'userIndex', error ) );
		},

		/**
		 * Login user
		 *
		 * @param context
		 * @param data
		 */
		userLogin( context, data )
		{
			let details = {
				email: data.email,
				password: btoa( data.password ) // Base64 encode password
			};

			return fetch( '/api/users/login', {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify( details )
			})
				.then( response => response.json() )
				.then( response => {
					// If there are any errors
					if( response.errors )
					{
						context.commit( 'errors', response.errors );
					}

					context.commit( 'message', response.message );
					context.commit( 'success', response.success ? response.success : false );

					if( response.token )
					{
						sessionStorage.setItem( 'token', response.token ); // Makes sure the user is logged in even after page refresh
						sessionStorage.setItem( 'group', response.group ); // Makes sure the users group is defined
						context.commit( 'userLogin', response.user );
					}
				})
				.catch( error => console.error( 'userLogin', error ) );
		},

		/**
		 * Register user
		 *
		 * @param context
		 * @param data
		 */
		userRegister( context, data )
		{
			let details = {
				first_name: data.first_name,
				last_name: data.last_name,
				email: data.email,
				country_id: data.country_id,
				currency_id: data.currency_id,
				language_id: data.language_id,
				password: btoa( data.password ), // Base64 encode password
				passwordRepeat: btoa( data.passwordRepeat ), // Base64 encode password
			};

		 	fetch( '/api/users/register', {
		 		headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify( details )
			})
				.then( response => response.json() )
				.then( response => {
					// If there are any errors
					if( response.errors )
					{
						context.commit( 'errors', response.errors );
					}

					context.commit( 'message', response.message );
					context.commit( 'success', response.success ? response.success : false );
				})
				.catch( error => console.error( 'userRegister', error ) );
		},

		userGetProfile( context )
		{
			return fetch( '/api/users/profile', {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				},
				method: 'GET'
			})
				.then( response => response.json() )
				.then( response => context.commit( response ) )
				.catch( error => console.error( 'userProfile', error ) );
		}
	},

	getters: {
		/**
		 * Get all users
		 *
		 * @param state
		 */
		userIndex( state )
		{
			return state.all.data;
		},

		/**
		 * Get total amount of users
		 *
		 * @param state
		 * @returns {number|totalItems|{type, default}|*|exports.default.props.totalItems|props.totalItems}
		 */
		userTotal( state )
		{
			return state.all.total;
		},

		/**
		 * Check if the user is logged in
		 * @param state
		 * @returns {boolean}
		 */
		userLoggedIn( state )
		{
			return state.loggedIn === true;
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
		},

		/**
		 * Check if user has access to specific route
		 *
		 * @param state
		 * @returns {function(*=)}
		 */
		userAccess: ( state ) => ( route ) =>
		{
			if( state.group &&  state.group.length > 0 ) {
				return state.group.split( ',' ).indexOf( route ) > 0;
			} else {
				return true;
			}
		},

		/**
		 * Get profile data
		 *
		 * @param state
		 * @returns {{}|state.user|*}
		 */
		userProfile( state )
		{
			return state.user;
		}
	}
}