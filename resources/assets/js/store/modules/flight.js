export default
{
	state: {
		results: {},
		departure: '',
		departureDate: '',
		destination: '',
		destinationDate: '',
		adults: 0,
		children: 0,
		infants: 0,
		cabinClass: '',
		cabinClasses: [
			{text: 'Economy', value: 'economy'},
			{text: 'Economy plus', value: 'premiumeconomy'},
			{text: 'Business', value: 'business'},
			{text: 'First', value: 'first'}
		],
	},

	mutations: {
		browseQuotes( state, flights )
		{
			state.results = flights;
		},

		cabinClasses( state, cClass )
		{
			state.cabinClasses.push( cClass );
		},

		flightDeparture( state, departure )
		{
			state.departure = departure;
		},

		flightDepartureDate( state, date )
		{
			state.departureDate = date;
		},

		flightDestination( state, destination )
		{
			state.destination = destination;
		},

		flightDestinationDate( state, date )
		{
			state.destinationDate = date;
		},

		flightAdults( state, adults )
		{
			state.adults = adults;
		},

		flightChildren( state, children )
		{
			state.children = children;
		},

		flightInfants( state, infants )
		{
			state.infants = infants;
		},

		flightCabinClass( state, cabinClass )
		{
			state.cabinClass = cabinClass;
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
		},

		cabinClasses ( state )
		{
			return state.cabinClasses;
		},

		flightDeparture( state )
		{
			return state.departure;
		},

		flightDepartureDate( state )
		{
			return state.departureDate;
		},

		flightDestination( state )
		{
			return state.destination;
		},

		flightDestinationDate( state )
		{
			return state.destinationDate;
		},

		flightAdults( state )
		{
			return state.adults;
		},

		flightChildren( state )
		{
			return state.children;
		},

		flightInfants( state )
		{
			return state.infants;
		},

		flightCabinClass( state )
		{
			return state.cabinClass;
		}
	}
}