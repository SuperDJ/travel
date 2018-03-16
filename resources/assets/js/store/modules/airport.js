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
			fetch( '/api/airports', {
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
					context.commit( 'airportIndex', response );
				})
				.catch( error => {
					console.error( 'airportIndex', error );
				});
		},

		/**
		 * Search for an airport
		 *
		 * @param context
		 * @param airport
		 */
		airportSearch( context, airport )
		{
			fetch( `/api/airports/${airport}/search` , {
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
					context.commit( 'airportSearch', response );
				})
				.catch( error => {
					console.error( 'airportSearch', error );
				});
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