export default
{
	state: {
		all: {}
	},

	mutations: {
		continentIndex( state, continents )
		{
			state.all = continents;
		}
	},

	actions: {
		continentIndex( context )
		{
			fetch('/api/continents')
				.then(response => {
					return response.json()
				})
				.then(response => {
					context.commit('continentIndex', response)
				});
		}
	},

	getters: {
		continentIndex( state )
		{
			return state.all;
		}
	}
}