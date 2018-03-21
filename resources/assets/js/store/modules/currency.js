export default {
	state: {
		all: {},
		search: {}
	},

	mutations: {
		/**
		 * Set all currencies
		 * @param state
		 * @param currencies
		 */
		currencyIndex( state, currencies ) {
			state.all = currencies;
		},

		/**
		 * Set search results
		 * @param state
		 * @param currencies
		 */
		currencySearch( state, currencies ) {
			state.search = currencies;
		}
	},

	actions: {
		/**
		 * Get all currencies from API
		 *
		 * @param context
		 */
		currencyIndex( context ) {
			return fetch( '/api/currencies', {
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
		 * Get search results from API
		 *
		 * @param context
		 * @param currency
		 */
		currencySearch( context, currency ) {
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
		 * @returns {{}|state.all|*}
		 */
		currencyIndex( state ) {
			return state.all;
		},

		/**
		 * Get search results
		 * @param state
		 */
		currencySearch( state ) {
			return state.search;
		}
	}
}