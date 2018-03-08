export default
{
	state: {
		all: {},
		search: {},
	},

	mutations: {
		/**
		 * Get all airports
		 *
		 * @param state
		 * @param airports
		 */
		airportIndex( state, airports )
		{
			state.all = airports;
		},

		/**
		 * Search airport
		 *
		 * @param state
		 * @param airports
		 */
		airportSearch( state, airports )
		{
			state.search = airports;
		},
	},

	actions: {
		/**
		 * Get all airports
		 *
		 * @param context
		 */
		airportIndex( context )
		{
			fetch('/api/airports')
				.then(response => {
					return response.json();
				})
				.then(response => {
					context.commit('airportIndex', response);
				})
				.catch(error => {
					console.error(error);
				});
		},

		/**
		 * Search for an airport
		 *
		 * @param context
		 * @param search
		 */
		airportSearch( context, search )
		{
			fetch(`/api/airports/${search}/search`)
				.then(response => {
					return response.json();
				})
				.then(response => {
					context.commit('airportSearch', response);
				})
				.catch(error => {
					console.log(error);
				})
		},
	},

	getters: {
		/**
		 * Get all airports
		 *
		 * @param state
		 * @returns {{}|state.all|*}
		 */
		airportIndex( state )
		{
			return state.all;
		},

		/**
		 * Get search results
		 *
		 * @param state
		 * @returns {{}|state.search|*}
		 */
		airportSearch( state )
		{
			return state.search;
		},
	}
}