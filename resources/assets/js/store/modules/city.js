export default
{
	state: {
		search: {}
	},

	mutations: {
		/**
		 * Set search results
		 *
		 * @param state
		 * @param cities
		 */
		citySearch( state, cities )
		{
			state.search = cities;
		}
	},

	actions: {
		/**
		 * Get search results from API
		 *
		 * @param context
		 * @param value
		 */
		citySearch( context, value )
		{
			fetch( `/api/cities/${value}/search` )
				.then(response => {
					return response.json();
				})
				.then(response => {
					context.commit( 'citySearch', response );
				})
				.catch(error => {
					console.error('citySearch', error);
				});
		}
	},

	getters: {
		/**
		 * Get search results
		 *
		 * @param state
		 * @returns {{}|state.search|*}
		 */
		citySearch( state )
		{
			return state.search;
		}
	}
}