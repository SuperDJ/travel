export default {
	state: {
		all: {}
	},

	mutations: {
		indexContinent( state, continents ) {
			state.all = continents;
		}
	},

	actions: {
		indexContinent( context ) {
			fetch('/api/continents')
				.then(response => {
					return response.json()
				})
				.then(response => {
					context.commit('indexContinent', response)
				});
		}
	},

	getters: {
		indexContinent( state ) {
			return state.all;
		}
	}
}