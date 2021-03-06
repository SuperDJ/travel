export default
{
	state: {
		all: [],
		search: {},
		edit: {}
	},

	mutations:  {
		/**
		 * Set all airports
		 *
		 * @param state
		 * @param airports
		 */
		airportIndex( state, airports )
		{
			state.all = airports;
		},

		airportEdit( state, airport )
		{
			state.edit = airport;
		},

		airportSearch( state, airports )
		{
			state.search = airports;
		}
	},

	actions: {
		/**
		 * Get all airports from API
		 *
		 * @param context
		 * @param pagination
		 */
		airportIndex( context, pagination )
		{
			let url = '/api/airports';
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
				.then( response => context.commit( 'airportIndex', response ) )
				.catch( error => console.error( 'airportIndex', error ) );
		},

		/**
		 * Store airport in DB
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		airportStore( context, data )
		{
			return fetch( '/api/airports', {
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
				.catch( error => console.error( 'airportStore', error ) );
		},

		/**
		 * Get information from specific airport
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		airportEdit( context, id )
		{
			return fetch( `/api/airports/${id}/edit`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				}
			})
				.then( response => response.json() )
				.then( response => context.commit( 'airportEdit', response ) )
				.catch( error => console.error( 'airportEdit', error ) );
		},

		/**
		 * Update airport in DB
		 *
		 * @param context
		 * @param data
		 */
		airportUpdate( context, data )
		{
			return fetch( `/api/airports/${data.id}`, {
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
				.catch( error => console.error( 'airportUpdate', error ) );
		},

		/**
		 * Destroy airport
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		airportDestroy( context, id )
		{
			return fetch( `/api/airports/${id}`, {
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
				.catch( error => console.error( 'airportDestroy', error ) );
		},

		/**
		 * Get search results from API
		 *
		 * @param context
		 * @param airport
		 */
		airportSearch( context, airport ) {
			return fetch( `/api/airports/${airport}/search`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Accept': 'application/json'
				}
			})
				.then( response =>  response.json() )
				.then( response => context.commit( 'airportSearch', response ) )
				.catch( error => console.error( 'airportSearch', error ) );
		}
	},

	getters: {
		/**
		 * Get all airports
		 *
		 * @param state
		 * @returns {{}|state.all|*}
		 */
		airportIndex( state )
		{
			if( state.all.data )
			{
				return state.all.data;
			} else {
				return state.all;
			}
		},

		airportEdit( state )
		{
			return state.edit;
		},

		/**
		 * Get the total amount of airports
		 * @param state
		 * @returns {*|number|PaymentItem}
		 */
		airportTotal( state )
		{
			return state.all.total;
		},

		airportSearch( state )
		{
			return state.search;
		}
	}
}