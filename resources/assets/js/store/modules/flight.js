export default {
	state: {
		results: {},
	},

	mutations: {
		browseQuotes( state, flights )
		{
			state.results = flights;
		}
	},

	actions: {
		browseQuotes( context, data )
		{
			fetch('/api/flights/browse-quotes', {
				headers: {
					'content-type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(data)
			})
				.then(response => {
					return response.json()
				})
				.then(response => {
					console.log(response);
					context.commit('browseQuotes', response);
				})
				.catch(error => {
					console.log(error);
				})
		}
	},

	getters: {
		browseQuotes( state )
		{
			return state.results;
		}
	}
}