export default {
	state: {
		all: [],
		search: {},
		edit: {},
	},

	mutations: {
		/**
		 * Set all role
		 *
		 * @param state
		 * @param role
		 */
		roleIndex( state, role ) {
			state.all = role;
		},

		/**
		 * Set edit role
		 *
		 * @param state
		 * @param role
		 */
		roleEdit( state, role )
		{
			state.edit = role;
		},

		/**
		 * Set search results
		 *
		 * @param state
		 * @param role
		 */
		roleSearch( state, role ) {
			state.search = role;
		}
	},

	actions: {
		/**
		 * Get all role
		 *
		 * @param context
		 * @param pagination
		 * @returns {Promise<any>}
		 */
		roleIndex( context, pagination )
		{
			let url = '/api/roles';
			if( pagination && Object.keys( pagination ).length > 1 )
			{
				url += `?${Object.keys( pagination ).map( key =>  `${key}=${pagination[ key ]}` ).join( '&' ) }`;
			}

			return fetch( url, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				}
			})
				.then( response => response.json() )
				.then( response => context.commit( 'roleIndex', response ) )
				.catch( error => console.error( 'roleIndex', error ) );
		},

		/**
		 * Store role
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		roleStore( context, data )
		{
			return fetch( '/api/roles', {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				},
				method: 'POST',
				body: JSON.stringify( data )
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
				.catch( error => console.error( 'roleStore', error ) );
		},

		/**
		 * Get data from specific role
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		roleEdit( context, id )
		{
			return fetch( `/api/roles/${id}/edit`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				}
			})
				.then( response => response.json() )
				.then( response => context.commit( 'roleEdit', response ) )
				.catch( error => console.error( 'roleEdit', error ) );
		},

		/**
		 * Update role
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		roleUpdate( context, data )
		{
			return fetch( `/api/roles/${data.id}`, {
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
				.catch( error => console.error( 'roleUpdate', error ) );
		},

		/**
		 * Destroy role
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		roleDestroy( context, id )
		{
			return fetch( `/api/roles/${id}`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				},
				method: 'DELETE',
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
				.catch( error => console.error( 'roleDestroy', error ) );
		},

		/**
		 * Get search results from API
		 *
		 * @param context
		 * @param role
		 */
		roleSearch( context, role ) {
			return fetch( `/api/roles/${role}/search`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Accept': 'application/json'
				}
			})
				.then( response =>  response.json() )
				.then( response => context.commit( 'roleSearch', response ) )
				.catch( error => console.error( 'roleSearch', error ) );
		}
	},

	getters: {
		/**
		 * Get all role
		 *
		 * @param state
		 * @returns {Array|*|{}|state.all}
		 */
		roleIndex( state )
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
		 * Get total amount of role
		 *
		 * @param state
		 * @returns {*|number|PaymentItem}
		 */
		roleTotal( state )
		{
			return state.all.total
		},

		/**
		 * Get role edit
		 *
		 * @param state
		 * @returns {{}|state.edit|*}
		 */
		roleEdit( state )
		{
			return state.edit;
		},

		/**
		 * Get search results
		 * @param state
		 */
		roleSearch( state ) {
			return state.search;
		}
	}
}