export default
{
	state: {
		search: {}
	},

	mutations: {
		citySearch( state, cities )
		{
			state.search = cities;
		}
	},

	actions: {
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
		citySearch( state )
		{
			return state.search;
		}
	}
}