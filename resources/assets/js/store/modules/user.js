export default
{
	state: {
		all: [],
		loggedIn: !!sessionStorage.getItem( 'token' ),
		user: JSON.parse( sessionStorage.getItem( 'user' ) ),
		edit: {},
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
		* Set edit user
		*
		* @param state
		* @param user
		*/
		userEdit( state, user )
		{
			state.edit = user;
		},

		/**
		 * Set user to logged in
		 *
		 * @param state
		 */
		userLogin( state )
		{
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
			let url = '/api/users';
			if( pagination && Object.keys( pagination ).length > 1 )
			{
				url += `?${Object.keys( pagination ).map( key =>  `${key}=${pagination[ key ]}` ).join( '&' ) }`;
			}

			return fetch( url, {
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
		 * Get data from specific user
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		userEdit( context, id )
		{
			return fetch( `/api/users/${id}/edit`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				}
			})
				.then( response => response.json() )
				.then( response => context.commit( 'userEdit', response ) )
				.catch( error => console.error( 'userEdit', error ) );
		},

		/**
		 * Update user
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		userUpdate( context, data )
		{
			return fetch( `/api/users/${data.id}`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				},
				method: 'PUT',
				body: JSON.stringify( data.details )
			})
				.then( response => response.json() )
				.then( response => {
					if( response.errors ) {
						context.commit( 'errors', response.errors );
					} else {
						context.commit( 'errors', []);
					}
					context.commit( 'message', response.message );
					context.commit( 'success', response.success );
				})
				.catch( error => console.error( 'userUpdate', error ) );
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
						sessionStorage.setItem( 'user', JSON.stringify( response.user ) );
						context.commit( 'userLogin' );
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
			if( state.all.data )
			{
				return state.all.data;
			} else
			{
				return state.all;
			}
		},

		/**
		 * Get user edit
		 *
		 * @param state
		 * @returns {{}|state.edit|*}
		 */
		userEdit( state )
		{
			let user = state.edit;

			if( user )
			{
				user = {
					first_name: user.first_name,
					last_name: user.last_name,
					email: user.email,
					currency_id: user.profile ? user.profile.currency_id : null,
					country_id: user.profile ? user.profile.country_id : null,
					timezone_id: user.profile ? user.profile.timezone_id : null,
					language_id: user.profile ? user.profile.language_id : null,
					roles: user.roles
				};
			}

			return user;
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
		 * Get all user roles
		 *
		 * @param state
		 * @returns {Array|default.computed.roles|roles}
		 */
		userRoles( state )
		{
			return state.user ? state.user.roles : [];
		},

		/**
		 * Get all user permissions
		 *
		 * @param state
		 * @returns {Array}
		 */
		userPermissions( state )
		{
			let permissions = [];

			if( state.user && state.user.roles )
			{
				for( let i = 0; i < state.user.roles.length; i++ )
				{
					let role = state.user.roles[i];
					for( let j = 0; j < role.permissions.length; j++ )
					{
						let permission = role.permissions[j];
						permissions.push( permission.name );
					}
				}
			}

			return permissions;
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