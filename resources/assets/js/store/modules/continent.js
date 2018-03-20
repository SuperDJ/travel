export default
{
	state: {
		all: []
	},

	mutations: {
		/**
		 * Set all continents
		 *
		 * @param state
		 * @param continents
		 */
		continentIndex( state, continents )
		{
			state.all = continents;
		}
	},

	actions: {
		/**
		 * Get all continents from API
		 *
		 * @param context
		 * @param pagination
		 */
		continentIndex( context, pagination )
		{
			return fetch( `/api/continents?${Object.keys(pagination).map(key => key + '=' + pagination[key]).join('&')}`, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Accept': 'application/json'
				}
			})
				.then( response => response.json() )
				.then( response => context.commit( 'continentIndex', response ) )
				.catch( error => console.error( 'continentIndex', error ) );
		}
	},

	getters: {
		/**
		 * Get all continents
		 *
		 * @param state
		 * @returns {{}|state.all|*}
		 */
		continentIndex( state )
		{
			return state.all.data;
		},

		continentTotal( state )
		{
			return state.all.total;
		}
	}
}