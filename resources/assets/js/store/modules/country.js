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
			fetch( '/api/countries' )
				.then( response => {
					return response.json()
				})
				.then( response => {
					this.commit( 'countryIndex', response );
				})
				.catch( error => {
					console.error( error );
				});
		},

		/**
		 * Get search results from API
		 *
		 * @param context
		 * @param country
		 */
		countrySearch( context, country )
		{
			fetch( `/api/countries/${country}/search` )
				.then( response => {
					return response.json();
				})
				.then( response => {
					this.commit( 'countrySearch', response );
				})
				.catch( error => {
					console.error( error );
				});
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