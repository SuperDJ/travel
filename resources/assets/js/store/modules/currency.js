export default {
	state: {
		all: [],
		search: {},
		edit: {},
	},

	mutations: {
		/**
		 * Set all currencies
		 *
		 * @param state
		 * @param currencies
		 */
		currencyIndex( state, currencies ) {
			state.all = currencies;
		},

		/**
		 * Set edit currency
		 *
		 * @param state
		 * @param currency
		 */
		currencyEdit( state, currency )
		{
			state.edit = currency;
		},

		/**
		 * Set search results
		 *
		 * @param state
		 * @param currencies
		 */
		currencySearch( state, currencies ) {
			state.search = currencies;
		}
	},

	actions: {
		/**
		 * Get all currencies
		 *
		 * @param context
		 * @param pagination
		 * @returns {Promise<any>}
		 */
		currencyIndex( context, pagination )
		{
			let url = '/api/currencies';
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
				.then( response => context.commit( 'currencyIndex', response ) )
				.catch( error => console.error( 'currencyIndex', error ) );
		},

		/**
		 * Store currency
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		currencyStore( context, data )
		{
			return fetch( '/api/currencies', {
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
				.catch( error => console.error( 'currencyStore', error ) );
		},

		/**
		 * Get data from specific currency
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		currencyEdit( context, id )
		{
			return fetch( `/api/currencies/${id}/edit`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				}
			})
				.then( response => response.json() )
				.then( response => context.commit( 'currencyEdit', response ) )
				.catch( error => console.error( 'currencyEdit', error ) );
		},

		/**
		 * Update currency
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		currencyUpdate( context, data )
		{
			return fetch( `/api/currencies/${data.id}`, {
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
				.catch( error => console.error( 'currencyUpdate', error ) );
		},

		/**
		 * Destroy currency
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		currencyDestroy( context, id )
		{
			return fetch( `/api/currencies/${id}`, {
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
				.catch( error => console.error( 'currencyDestroy', error ) );
		},

		/**
		 * Get search results
		 *
		 * @param context
		 * @param currency
		 * @returns {Promise<any>}
		 */
		currencySearch( context, currency )
		{
			return fetch( `/api/currencies/${currency}/search`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Accept': 'application/json'
				}
			})
				.then( response => response.json() )
				.then( response => context.commit( 'currencySearch', response ) )
				.catch( error => console.error( 'currencySearch', error ) );
		}
	},

	getters: {
		/**
		 * Get all currencies
		 *
		 * @param state
		 * @returns {Array|*|{}|state.all}
		 */
		currencyIndex( state )
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
		 * Get total amount of currencies
		 *
		 * @param state
		 * @returns {*|number|PaymentItem}
		 */
		currencyTotal( state )
		{
			return state.all.total
		},

		/**
		 * Get currency edit
		 *
		 * @param state
		 * @returns {{}|state.edit|*}
		 */
		currencyEdit( state )
		{
			return state.edit;
		},

		/**
		 * Get search results
		 *
		 * @param state
		 * @returns {{}|state.search|*}
		 */
		currencySearch( state )
		{
			return state.search;
		}
	}
}