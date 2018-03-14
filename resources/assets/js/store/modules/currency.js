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
			fetch( '/api/currencies' )
				.then( response => {
					return response.json()
				} )
				.then( response => {
					this.commit( 'currencyIndex', response );
				} )
				.catch( error => {
					console.error( error );
				} );
		},

		/**
		 * Get search results from API
		 *
		 * @param context
		 * @param currency
		 */
		currencySearch( context, currency ) {
			fetch( `/api/currencies/${currency}/search` )
				.then( response => {
					return response.json();
				} )
				.then( response => {
					this.commit( 'currencySearch', response );
				} )
				.catch( error => {
					console.error( error );
				} );
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