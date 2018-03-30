export default {
	state: {
		all: [],
		search: {},
		edit: {},
	},

	mutations: {
		/**
		 * Set all permission
		 *
		 * @param state
		 * @param permission
		 */
		permissionIndex( state, permission ) {
			state.all = permission;
		},

		/**
		 * Set edit permission
		 *
		 * @param state
		 * @param permission
		 */
		permissionEdit( state, permission )
		{
			state.edit = permission;
		},

		/**
		 * Set search results
		 *
		 * @param state
		 * @param permission
		 */
		permissionSearch( state, permission ) {
			state.search = permission;
		}
	},

	actions: {
		/**
		 * Get all permission
		 *
		 * @param context
		 * @param pagination
		 * @returns {Promise<any>}
		 */
		permissionIndex( context, pagination )
		{
			let url = '/api/permissions';
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
				.then( response => context.commit( 'permissionIndex', response ) )
				.catch( error => console.error( 'permissionIndex', error ) );
		},

		/**
		 * Store permission
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		permissionStore( context, data )
		{
			return fetch( '/api/permissions', {
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
				.catch( error => console.error( 'permissionStore', error ) );
		},

		/**
		 * Get data from specific permission
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		permissionEdit( context, id )
		{
			return fetch( `/api/permissions/${id}/edit`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				}
			})
				.then( response => response.json() )
				.then( response => context.commit( 'permissionEdit', response ) )
				.catch( error => console.error( 'permissionEdit', error ) );
		},

		/**
		 * Update permission
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		permissionUpdate( context, data )
		{
			return fetch( `/api/permissions/${data.id}`, {
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
				.catch( error => console.error( 'permissionUpdate', error ) );
		},

		/**
		 * Destroy permission
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		permissionDestroy( context, id )
		{
			return fetch( `/api/permissions/${id}`, {
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
				.catch( error => console.error( 'permissionDestroy', error ) );
		},

		/**
		 * Get search results from API
		 *
		 * @param context
		 * @param permission
		 */
		permissionSearch( context, permission )
		{
			return fetch( `/api/permissions/${permission}/search`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				}
			})
				.then( response =>  response.json() )
				.then( response => context.commit( 'permissionSearch', response ) )
				.catch( error => console.error( 'permissionSearch', error ) );
		},

		permissionServer( context )
		{
			return fetch( '/api/permissions/routes', {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				}
			})
				.then( response => response.json() )
				.then( response => {
					context.commit( 'message', response.message );
					context.commit( 'success', response.success );
				})
				.catch( error => console.error( 'permissionServer', error ));
		}
	},

	getters: {
		/**
		 * Get all permission
		 *
		 * @param state
		 * @returns {Array|*|{}|state.all}
		 */
		permissionIndex( state )
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
		 * Get total amount of permission
		 *
		 * @param state
		 * @returns {*|number|PaymentItem}
		 */
		permissionTotal( state )
		{
			return state.all.total
		},

		/**
		 * Get permission edit
		 *
		 * @param state
		 * @returns {{}|state.edit|*}
		 */
		permissionEdit( state )
		{
			return state.edit;
		},

		/**
		 * Get search results
		 * @param state
		 */
		permissionSearch( state ) {
			return state.search;
		}
	}
}