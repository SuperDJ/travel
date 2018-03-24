export default
{
	state: {
		all: [],
		search: {},
		edit: {}
	},

	mutations: {
		/**
		 * Set all timezone
		 *
		 * @param state
		 * @param timezone
		 */
		timezoneIndex( state, timezone ) {
			state.all = timezone;
		},

		/**
		 * Set edit timezone
		 *
		 * @param state
		 * @param timezone
		 */
		timezoneEdit( state, timezone )
		{
			state.edit = timezone;
		},

		/**
		 * Set search results
		 *
		 * @param state
		 * @param timezone
		 */
		timezoneSearch( state, timezone ) {
			state.search = timezone;
		}
	},

	actions: {
		/**
		 * Get all timezone
		 *
		 * @param context
		 * @param pagination
		 * @returns {Promise<any>}
		 */
		timezoneIndex( context, pagination )
		{
			let url = '/api/timezones';
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
				.then( response => context.commit( 'timezoneIndex', response ) )
				.catch( error => console.error( 'timezoneIndex', error ) );
		},

		/**
		 * Store timezone
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		timezoneStore( context, data )
		{
			return fetch( '/api/timezones', {
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
				.catch( error => console.error( 'timezoneStore', error ) );
		},

		/**
		 * Get data from specific timezone
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		timezoneEdit( context, id )
		{
			return fetch( `/api/timezones/${id}/edit`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				}
			})
				.then( response => response.json() )
				.then( response => context.commit( 'timezoneEdit', response ) )
				.catch( error => console.error( 'timezoneEdit', error ) );
		},

		/**
		 * Update timezone
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		timezoneUpdate( context, data )
		{
			return fetch( `/api/timezones/${data.id}`, {
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
				.catch( error => console.error( 'timezoneUpdate', error ) );
		},

		/**
		 * Destroy timezone
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		timezoneDestroy( context, id )
		{
			return fetch( `/api/timezones/${id}`, {
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
				.catch( error => console.error( 'timezoneDestroy', error ) );
		},

		/**
		 * Get search results from API
		 *
		 * @param context
		 * @param timezone
		 */
		timezoneSearch( context, timezone ) {
			return fetch( `/api/timezones/${timezone}/search`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Accept': 'application/json'
				}
			})
				.then( response =>  response.json() )
				.then( response => context.commit( 'timezoneSearch', response ) )
				.catch( error => console.error( 'timezoneSearch', error ) );
		}
	},

	getters: {
		/**
		 * Get all timezone
		 *
		 * @param state
		 * @returns {Array|*|{}|state.all}
		 */
		timezoneIndex( state )
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
		 * Get total amount of timezone
		 *
		 * @param state
		 * @returns {*|number|PaymentItem}
		 */
		timezoneTotal( state )
		{
			return state.all.total
		},

		/**
		 * Get timezone edit
		 *
		 * @param state
		 * @returns {{}|state.edit|*}
		 */
		timezoneEdit( state )
		{
			return state.edit;
		},

		/**
		 * Get search results
		 * @param state
		 */
		timezoneSearch( state ) {
			return state.search;
		}
	}
}