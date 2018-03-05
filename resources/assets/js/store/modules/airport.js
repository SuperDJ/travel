export default {
	state: {
		all: {},
		search: {},
		cabinClasses: [
			{text: 'Economy', value: 'economy'},
			{text: 'Economy plus', value: 'premiumeconomy'},
			{text: 'Business', value: 'business'},
			{text: 'First', value: 'first'}
		],
	},

	mutations: {
		indexAirport( state, airports )
		{
			state.all = airports;
		},

		searchAirport( state, airports )
		{
			state.search = airports;
		},

		cabinClass( state, cClass )
		{
			state.cabinClasses.push(cClass);
		}
	},

	actions: {
		indexAirport( context )
		{
			fetch('/api/airports')
				.then(response => {
					return response.json();
				})
				.then(response => {
					context.commit('indexAirport', response);
				})
				.catch(error => {
					console.error(error);
				});
		},

		searchAirport( context, search )
		{
			fetch(`/api/airports/${search}/search`)
				.then(response => {
					return response.json();
				})
				.then(response => {
					context.commit('searchAirport', response);
				})
				.catch(error => {
					console.log(error);
				})
		},
	},

	getters: {
		indexAirport( state )
		{
			return state.all;
		},

		searchAirport( state )
		{
			return state.search;
		},

		cabinClasses ( state )
		{
			return state.cabinClasses;
		}
	}
}