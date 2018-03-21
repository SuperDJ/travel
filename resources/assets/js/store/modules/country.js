export default
{
	state: {
		all: {},
		search: {}
	},

	mutations: {
		countryIndex( state, countries )
		{
			state.all = countries;
		},

		countrySearch( state, countries )
		{
			state.search  = countries;
		}
	},

	actions: {
		/**
		 * Get all countries from API
		 *
		 * @param context
		 */
		countryIndex( context )
		{
			return fetch( '/api/countries', {
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
		 * Get search results from API
		 *
		 * @param context
		 * @param country
		 */
		countrySearch( context, country )
		{
			return fetch( `/api/countries/${country}/search`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Accept': 'application/json'
				}
			})
				.then( response => response.json() )
				.then( response => context.commit( 'countrySearch', response ) )
				.catch( error => console.error( 'countrySearch', error ) );
		}
	},

	getters: {
		/**
		 * Get all countries
		 *
		 * @param state
		 * @returns {{}|state.all|*}
		 */
		countryIndex( state )
		{
			return state.all;
		},

		/**
		 * Get search results
		 * @param state
		 */
		countrySearch( state )
		{
			return state.search;
		}
	}
}