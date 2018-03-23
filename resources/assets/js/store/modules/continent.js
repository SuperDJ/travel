export default
{
	state: {
		all: [],
		search: {},
		edit: {}
	},

	mutations: {
		/**
		 * Set all continents
		 *
		 * @param state
		 * @param continents
		 */
		continentIndex( state, continents )
		{
			state.all = continents;
		},

		continentEdit( state, continent )
		{
			state.edit = continent;
		},

		continentSearch( state, continents )
		{
			state.search = continents;
		}
	},

	actions: {
		/**
		 * Get all continents from API
		 *
		 * @param context
		 * @param pagination
		 */
		continentIndex( context, pagination )
		{
			let url = '/api/continents';
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
				.then( response => context.commit( 'continentIndex', response ) )
				.catch( error => console.error( 'continentIndex', error ) );
		},

		/**
		 * Store continent in DB
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		continentStore( context, data )
		{
			return fetch( '/api/continents', {
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
				.catch( error => console.error( 'continentStore', error ) );
		},

		/**
		 * Get information from specific continent
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		continentEdit( context, id )
		{
			return fetch( `/api/continents/${id}/edit`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				}
			})
				.then( response => response.json() )
				.then( response => context.commit( 'continentEdit', response ) )
				.catch( error => console.error( 'continentEdit', error ) );
		},

		/**
		 * Update continent in DB
		 *
		 * @param context
		 * @param data
		 */
		continentUpdate( context, data )
		{
			return fetch( `/api/continents/${data.id}`, {
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
				.catch( error => console.error( 'continentUpdate', error ) );
		},

		/**
		 * Destroy continent
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		continentDestroy( context, id )
		{
			return fetch( `/api/continents/${id}`, {
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
				.catch( error => console.error( 'continentDestroy', error ) );
		},

		/**
		 * Get search results from API
		 *
		 * @param context
		 * @param continent
		 */
		continentSearch( context, continent ) {
			return fetch( `/api/continents/${continent}/search`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Accept': 'application/json'
				}
			})
				.then( response =>  response.json() )
				.then( response => context.commit( 'continentSearch', response ) )
				.catch( error => console.error( 'continentSearch', error ) );
		}
	},

	getters: {
		/**
		 * Get all continents
		 *
		 * @param state
		 * @returns {{}|state.all|*}
		 */
		continentIndex( state )
		{
			if( state.all.data )
			{
				return state.all.data;
			} else {
				return state.all;
			}
		},

		continentEdit( state )
		{
			return state.edit;
		},

		/**
		 * Get the total amount of continents
		 * @param state
		 * @returns {*|number|PaymentItem}
		 */
		continentTotal( state )
		{
			return state.all.total;
		},

		continentSearch( state )
		{
			return state.search;
		}
	}
}