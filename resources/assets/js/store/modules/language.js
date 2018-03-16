export default {
	state: {
		all: {},
		search: {}
	},

	mutations: {
		languageIndex( state, languages ) {
			state.all = languages;
		},

		languageSearch( state, languages ) {
			state.search = languages;
		}
	},

	actions: {
		/**
		 * Get all languages from API
		 *
		 * @param context
		 */
		languageIndex( context ) {
			fetch( '/api/languages', {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify( data )
			})
				.then( response => {
					return response.json()
				} )
				.then( response => {
					this.commit( 'languageIndex', response );
				} )
				.catch( error => {
					console.error( error );
				} );
		},

		/**
		 * Get search results from API
		 *
		 * @param context
		 * @param language
		 */
		languageSearch( context, language ) {
			fetch( `/api/languages/${language}/search`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Accept': 'application/json'
				}
			})
				.then( response => {
					return response.json();
				})
				.then( response => {
					this.commit( 'languageSearch', response );
				})
				.catch( error => {
					console.error( 'languageSearch', error );
				});
		}
	},

	getters: {
		/**
		 * Get all languages
		 *
		 * @param state
		 * @returns {{}|state.all|*}
		 */
		languageIndex( state ) {
			return state.all;
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