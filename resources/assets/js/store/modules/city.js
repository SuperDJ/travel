export default
{
	state: {
		all: [],
		search: {},
		edit: {}
	},

	mutations: {
		/**
		 * Set all city
		 *
		 * @param state
		 * @param city
		 */
		cityIndex( state, city ) {
			state.all = city;
		},

		/**
		 * Set edit city
		 *
		 * @param state
		 * @param city
		 */
		cityEdit( state, city )
		{
			state.edit = city;
		},

		/**
		 * Set search results
		 *
		 * @param state
		 * @param city
		 */
		citySearch( state, city ) {
			state.search = city;
		}
	},

	actions: {
		/**
		 * Get all city
		 *
		 * @param context
		 * @param pagination
		 * @returns {Promise<any>}
		 */
		cityIndex( context, pagination )
		{
			let url = '/api/cities';
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
				.then( response => context.commit( 'cityIndex', response ) )
				.catch( error => console.error( 'cityIndex', error ) );
		},

		/**
		 * Store city
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		cityStore( context, data )
		{
			return fetch( '/api/cities', {
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
				.catch( error => console.error( 'cityStore', error ) );
		},

		/**
		 * Get data from specific city
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		cityEdit( context, id )
		{
			return fetch( `/api/cities/${id}/edit`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				}
			})
				.then( response => response.json() )
				.then( response => context.commit( 'cityEdit', response ) )
				.catch( error => console.error( 'cityEdit', error ) );
		},

		/**
		 * Update city
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		cityUpdate( context, data )
		{
			return fetch( `/api/cities/${data.id}`, {
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
				.catch( error => console.error( 'cityUpdate', error ) );
		},

		/**
		 * Destroy city
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		cityDestroy( context, id )
		{
			return fetch( `/api/cities/${id}`, {
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
				.catch( error => console.error( 'cityDestroy', error ) );
		},

		/**
		 * Get search results from API
		 *
		 * @param context
		 * @param city
		 */
		citySearch( context, city ) {
			return fetch( `/api/cities/${city}/search`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Accept': 'application/json'
				}
			})
				.then( response =>  response.json() )
				.then( response => context.commit( 'citySearch', response ) )
				.catch( error => console.error( 'citySearch', error ) );
		}
	},

	getters: {
		/**
		 * Get all city
		 *
		 * @param state
		 * @returns {Array|*|{}|state.all}
		 */
		cityIndex( state )
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
		 * Get total amount of city
		 *
		 * @param state
		 * @returns {*|number|PaymentItem}
		 */
		cityTotal( state )
		{
			return state.all.total
		},

		/**
		 * Get city edit
		 *
		 * @param state
		 * @returns {{}|state.edit|*}
		 */
		cityEdit( state )
		{
			return state.edit;
		},

		/**
		 * Get search results
		 * @param state
		 */
		citySearch( state ) {
			return state.search;
		}
	}
}