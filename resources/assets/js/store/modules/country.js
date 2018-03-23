export default
{
	state: {
		all: [],
		search: {},
		edit: {}
	},

	mutations: {
		/**
		 * Set all country
		 *
		 * @param state
		 * @param country
		 */
		countryIndex( state, country ) {
			state.all = country;
		},

		/**
		 * Set edit country
		 *
		 * @param state
		 * @param country
		 */
		countryEdit( state, country )
		{
			state.edit = country;
		},

		/**
		 * Set search results
		 *
		 * @param state
		 * @param country
		 */
		countrySearch( state, country ) {
			state.search = country;
		}
	},

	actions: {
		/**
		 * Get all country
		 *
		 * @param context
		 * @param pagination
		 * @returns {Promise<any>}
		 */
		countryIndex( context, pagination )
		{
			let url = '/api/countries';
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
				.then( response => context.commit( 'countryIndex', response ) )
				.catch( error => console.error( 'countryIndex', error ) );
		},

		/**
		 * Store country
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		countryStore( context, data )
		{
			return fetch( '/api/countries', {
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
				.catch( error => console.error( 'countryStore', error ) );
		},

		/**
		 * Get data from specific country
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		countryEdit( context, id )
		{
			return fetch( `/api/countries/${id}/edit`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				}
			})
				.then( response => response.json() )
				.then( response => context.commit( 'countryEdit', response ) )
				.catch( error => console.error( 'countryEdit', error ) );
		},

		/**
		 * Update country
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		countryUpdate( context, data )
		{
			return fetch( `/api/countries/${data.id}`, {
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
				.catch( error => console.error( 'countryUpdate', error ) );
		},

		/**
		 * Destroy country
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		countryDestroy( context, id )
		{
			return fetch( `/api/countries/${id}`, {
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
				.catch( error => console.error( 'countryDestroy', error ) );
		},

		/**
		 * Get search results from API
		 *
		 * @param context
		 * @param country
		 */
		countrySearch( context, country ) {
			return fetch( `/api/countries/${country}/search`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Accept': 'application/json'
				}
			})
				.then( response =>  response.json() )
				.then( response => context.commit( 'countrySearch', response ) )
				.catch( error => console.error( 'countrySearch', error ) );
		}
	},

	getters: {
		/**
		 * Get all country
		 *
		 * @param state
		 * @returns {Array|*|{}|state.all}
		 */
		countryIndex( state )
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
		 * Get total amount of country
		 *
		 * @param state
		 * @returns {*|number|PaymentItem}
		 */
		countryTotal( state )
		{
			return state.all.total
		},

		/**
		 * Get country edit
		 *
		 * @param state
		 * @returns {{}|state.edit|*}
		 */
		countryEdit( state )
		{
			return state.edit;
		},

		/**
		 * Get search results
		 * @param state
		 */
		countrySearch( state ) {
			return state.search;
		}
	}
}