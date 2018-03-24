export default
{
	state: {
		all: [],
		search: {},
		edit: {}
	},

	mutations:  {
		/**
		 * Set all airlines
		 *
		 * @param state
		 * @param airlines
		 */
		airlineIndex( state, airlines )
		{
			state.all = airlines;
		},

		airlineEdit( state, airline )
		{
			state.edit = airline;
		},

		airlineSearch( state, airlines )
		{
			state.search = airlines;
		}
	},

	actions: {
		/**
		 * Get all airlines from API
		 *
		 * @param context
		 * @param pagination
		 */
		airlineIndex( context, pagination )
		{
			let url = '/api/airlines';
			if( pagination && Object.keys( pagination ).length > 1 )
			{
				url += `?${Object.keys( pagination ).map( key =>  `${key}=${pagination[ key ]}` ).join( '&' ) }`;
			}

			return fetch( url, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Accept': 'application/json'
				}
			})
				.then( response => response.json() )
				.then( response => context.commit( 'airlineIndex', response ) )
				.catch( error => console.error( 'airlineIndex', error ) );
		},

		/**
		 * Store airline in DB
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		airlineStore( context, data )
		{
			return fetch( '/api/airlines', {
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
				.catch( error => console.error( 'airlineStore', error ) );
		},

		/**
		 * Get information from specific airline
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		airlineEdit( context, id )
		{
			return fetch( `/api/airlines/${id}/edit`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				}
			})
				.then( response => response.json() )
				.then( response => context.commit( 'airlineEdit', response ) )
				.catch( error => console.error( 'airlineEdit', error ) );
		},

		/**
		 * Update airline in DB
		 *
		 * @param context
		 * @param data
		 */
		airlineUpdate( context, data )
		{
			return fetch( `/api/airlines/${data.id}`, {
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
				.catch( error => console.error( 'airlineUpdate', error ) );
		},

		/**
		 * Destroy airline
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		airlineDestroy( context, id )
		{
			return fetch( `/api/airlines/${id}`, {
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
				.catch( error => console.error( 'airlineDestroy', error ) );
		},

		/**
		 * Get search results from API
		 *
		 * @param context
		 * @param airline
		 */
		airlineSearch( context, airline ) {
			return fetch( `/api/airlines/${airline}/search`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Accept': 'application/json'
				}
			})
				.then( response =>  response.json() )
				.then( response => context.commit( 'airlineSearch', response ) )
				.catch( error => console.error( 'airlineSearch', error ) );
		}
	},

	getters: {
		/**
		 * Get all airlines
		 *
		 * @param state
		 * @returns {{}|state.all|*}
		 */
		airlineIndex( state )
		{
			if( state.all.data )
			{
				return state.all.data;
			} else {
				return state.all;
			}
		},

		airlineEdit( state )
		{
			return state.edit;
		},

		/**
		 * Get the total amount of airlines
		 * @param state
		 * @returns {*|number|PaymentItem}
		 */
		airlineTotal( state )
		{
			return state.all.total;
		},

		airlineSearch( state )
		{
			return state.search;
		}
	}
}