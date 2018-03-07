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
		airportIndex( state )
		{
			return state.all;
		},

		airportSearch( state )
		{
			return state.search;
		},
	}
}