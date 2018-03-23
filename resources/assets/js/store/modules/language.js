export default {
	state: {
		all: [],
		search: {},
		edit: {},
	},

	mutations: {
		/**
		 * Set all language
		 *
		 * @param state
		 * @param language
		 */
		languageIndex( state, language ) {
			state.all = language;
		},

		/**
		 * Set edit language
		 *
		 * @param state
		 * @param language
		 */
		languageEdit( state, language )
		{
			state.edit = language;
		},

		/**
		 * Set search results
		 *
		 * @param state
		 * @param language
		 */
		languageSearch( state, language ) {
			state.search = language;
		}
	},

	actions: {
		/**
		 * Get all language
		 *
		 * @param context
		 * @param pagination
		 * @returns {Promise<any>}
		 */
		languageIndex( context, pagination )
		{
			let url = '/api/languages';
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
				.then( response => context.commit( 'languageIndex', response ) )
				.catch( error => console.error( 'languageIndex', error ) );
		},

		/**
		 * Store language
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		languageStore( context, data )
		{
			return fetch( '/api/languages', {
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
				.catch( error => console.error( 'languageStore', error ) );
		},

		/**
		 * Get data from specific language
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		languageEdit( context, id )
		{
			return fetch( `/api/languages/${id}/edit`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				}
			})
				.then( response => response.json() )
				.then( response => context.commit( 'languageEdit', response ) )
				.catch( error => console.error( 'languageEdit', error ) );
		},

		/**
		 * Update language
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		languageUpdate( context, data )
		{
			return fetch( `/api/languages/${data.id}`, {
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
				.catch( error => console.error( 'languageUpdate', error ) );
		},

		/**
		 * Destroy language
		 *
		 * @param context
		 * @param id
		 * @returns {Promise<any>}
		 */
		languageDestroy( context, id )
		{
			return fetch( `/api/languages/${id}`, {
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
				.catch( error => console.error( 'languageDestroy', error ) );
		},

		/**
		 * Get search results from API
		 *
		 * @param context
		 * @param language
		 */
		languageSearch( context, language ) {
			return fetch( `/api/languages/${language}/search`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Accept': 'application/json'
				}
			})
				.then( response =>  response.json() )
				.then( response => context.commit( 'languageSearch', response ) )
				.catch( error => console.error( 'languageSearch', error ) );
		}
	},

	getters: {
		/**
		 * Get all language
		 *
		 * @param state
		 * @returns {Array|*|{}|state.all}
		 */
		languageIndex( state )
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
		 * Get total amount of language
		 *
		 * @param state
		 * @returns {*|number|PaymentItem}
		 */
		languageTotal( state )
		{
			return state.all.total
		},

		/**
		 * Get language edit
		 *
		 * @param state
		 * @returns {{}|state.edit|*}
		 */
		languageEdit( state )
		{
			return state.edit;
		},

		/**
		 * Get search results
		 * @param state
		 */
		languageSearch( state ) {
			return state.search;
		}
	}
}