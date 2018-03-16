export default
{
	state: {
		results: {},
		departure: '',
		departureDate: '',
		destination: '',
		destinationDate: '',
		adults: 1,
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
		/**
		 * Set results
		 *
		 * @param state
		 * @param flights
		 */
		browseQuotes( state, flights )
		{
			state.results = flights;
		},

		/**
		 * Set results
		 *
		 * @param state
		 * @param flights
		 */
		browseRoutes( state, flights )
		{
			state.results = flights;
		},

		/**
		 * Add cabin class
		 *
		 * @param state
		 * @param cClass
		 */
		cabinClasses( state, cClass )
		{
			state.cabinClasses.push( cClass );
		},

		/**
		 * Set departure location
		 *
		 * @param state
		 * @param departure
		 */
		flightDeparture( state, departure )
		{
			state.departure = departure;
		},

		/**
		 * Set departure date
		 *
		 * @param state
		 * @param date
		 */
		flightDepartureDate( state, date )
		{
			state.departureDate = date;
		},

		/**
		 * Set destination location
		 *
		 * @param state
		 * @param destination
		 */
		flightDestination( state, destination )
		{
			state.destination = destination;
		},

		/**
		 * Set destination/ return date
		 *
		 * @param state
		 * @param date
		 */
		flightDestinationDate( state, date )
		{
			state.destinationDate = date;
		},

		/**
		 * Set amount of adults
		 *
		 * @param state
		 * @param adults
		 */
		flightAdults( state, adults )
		{
			state.adults = adults;
		},

		/**
		 * Set amount of children
		 *
		 * @param state
		 * @param children
		 */
		flightChildren( state, children )
		{
			state.children = children;
		},

		/**
		 * Set amount of infants
		 *
		 * @param state
		 * @param infants
		 */
		flightInfants( state, infants )
		{
			state.infants = infants;
		},

		/**
		 * Set cabin class
		 * @param state
		 * @param cabinClass
		 */
		flightCabinClass( state, cabinClass )
		{
			state.cabinClass = cabinClass;
		}
	},

	actions: {
		/**
		 * Get browse quotes results from API
		 *
		 * @param context
		 * @param data
		 */
		browseQuotes( context, data )
		{
			fetch('/api/flights/browse-quotes', {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(data)
			})
				.then( response => { return response.json() } )
				.then( response => {
					//console.log(response);
					context.commit( 'browseQuotes', response );
				})
				.catch( error => {
					console.error( 'browseQuotes', error );
				} );
		},

		/**
		 * Get browse routes results from API
		 * @param context
		 * @param data
		 */
		browseRoutes( context, data )
		{
			fetch('/api/flights/browse-routes', {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify( data )
			})
				.then( response => {
					return response.json()
				})
				.then( response => {
					console.log(response);
					context.commit( 'browseRoutes', response );
				})
				.catch( error => {
					console.error( 'browseRoutes', error );
				} );
		}
	},

	getters: {
		/**
		 * Get browse quotes results
		 *
		 * @param state
		 * @returns {{}|state.results|*}
		 */
		browseQuotes( state )
		{
			return state.results;
		},

		/**
		 * Get browse routes results
		 *
		 * @param state
		 * @returns {{}|state.results|*}
		 */
		browseRoutes( state )
		{
			return state.results;
		},

		/**
		 * Get cabin classes
		 *
		 * @param state
		 * @returns {*[]}
		 */
		cabinClasses ( state )
		{
			return state.cabinClasses;
		},

		/**
		 * Get departure location
		 *
		 * @param state
		 * @returns {string|*}
		 */
		flightDeparture( state )
		{
			return state.departure;
		},

		/**
		 * Get departure date
		 *
		 * @param state
		 * @returns {string|*}
		 */
		flightDepartureDate( state )
		{
			return state.departureDate;
		},

		/**
		 * Get destination
		 *
		 * @param state
		 * @returns {string|*}
		 */
		flightDestination( state )
		{
			return state.destination;
		},

		/**
		 * Get destination/ return date
		 *
		 * @param state
		 * @returns {string|*}
		 */
		flightDestinationDate( state )
		{
			return state.destinationDate;
		},

		/**
		 * Get amount of adults
		 *
		 * @param state
		 * @returns {number|*}
		 */
		flightAdults( state )
		{
			return state.adults;
		},

		/**
		 * Get amount of children
		 *
		 * @param state
		 * @returns {number|*}
		 */
		flightChildren( state )
		{
			return state.children;
		},

		/**
		 * Get amount of infants
		 *
		 * @param state
		 * @returns {number|*}
		 */
		flightInfants( state )
		{
			return state.infants;
		},

		/**
		 * Get cabin class
		 *
		 * @param state
		 * @returns {string|*}
		 */
		flightCabinClass( state )
		{
			return state.cabinClass;
		}
	}
}