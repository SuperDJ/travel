export default
{
	state: {
		all: {}
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
		 */
		continentIndex( context )
		{
			fetch( '/api/continents', {
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
					context.commit( 'continentIndex', response );
				})
				.catch( error => {
					console.error( 'continentIndex', error );
				});
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
			return state.all;
		}
	}
}