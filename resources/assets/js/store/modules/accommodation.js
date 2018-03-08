export default
{
	state: {
		result: {},
		city: '',
		checkinDate: '',
		checkoutDate: '',
		rooms: 0,
		persons: 1,
		sort: '',
		minPrice: '',
		maxPrice: '',
		cancellation: '',
		meals: '',
		propertyType: '',
		limit: 10,
		offset: 0,
	},

	mutations: {
		/**
		 * Set city
		 *
		 * @param state
		 * @param city
		 */
		accommodationCity( state, city )
		{
			state.city = city;
		},

		/**
		 * Set checkin date
		 *
		 * @param state
		 * @param date
		 */
		accommodationCheckinDate( state, date )
		{
			state.checkinDate = date;
		},

		/**
		 * Set checkout date
		 *
		 * @param state
		 * @param date
		 */
		accommodationCheckoutDate( state, date )
		{
			state.checkoutDate = date;
		},

		/**
		 * Set number of rooms
		 *
		 * @param state
		 * @param rooms
		 */
		accommodationRooms( state, rooms )
		{
			state.rooms = rooms;
		},

		/**
		 * Set amount of persons
		 * @param state
		 * @param persons
		 */
		accommodationPersons( state, persons )
		{
			state.persons = persons;
		},

		/**
		 * Set sort
		 *
		 * @param state
		 * @param sort
		 */
		accommodationSort( state, sort )
		{
			state.sort = sort;
		},

		/**
		 * Set min price
		 * @param state
		 * @param price
		 */
		accommodationMinPrice( state, price )
		{
			state.minPrice = price;
		},

		/**
		 * Set max price
		 *
		 * @param state
		 * @param price
		 */
		accommodationMaxPrice( state, price )
		{
			state.maxPrice = price;
		},

		/**
		 * Set cancellation options
		 *
		 * @param state
		 * @param value
		 */
		accommodationCancellation( state, value )
		{
			state.cancellation = value;
		},

		/**
		 * Set meal options
		 * @param state
		 * @param value
		 */
		accommodationMeals( state, value )
		{
			state.meals = value;
		},

		/**
		 * Set property types
		 *
		 * @param state
		 * @param value
		 */
		accommodationPropertyType( state, value )
		{
			state.propertyType = value;
		},

		/**
		 * Set limit results
		 *
		 * @param state
		 * @param value
		 */
		accommodationLimit( state, value )
		{
			state.limit = value;
		},

		/**
		 * Set offset for pagination
		 *
		 * @param state
		 * @param value
		 */
		accommodationOffset( state, value )
		{
			state.offset = value;
		},
	},

	actions: {

	},

	getters: {
		/**
		 * Get city
		 *
		 * @param state
		 * @returns {string|*}
		 */
		accommodationCity( state )
		{
			return state.city;
		},

		/**
		 * Get checkin date
		 *
		 * @param state
		 * @returns {string|*}
		 */
		accommodationCheckinDate( state )
		{
			return state.checkinDate;
		},

		/**
		 * Get checkout date
		 *
		 * @param state
		 * @returns {string|*}
		 */
		accommodationCheckoutDate( state )
		{
			return state.checkoutDate;
		},

		/**
		 * Get amount of rooms
		 *
		 * @param state
		 * @returns {number|*}
		 */
		accommodationRooms( state )
		{
			return state.rooms;
		},

		/**
		 * Get amount of persons
		 *
		 * @param state
		 * @returns {number|*}
		 */
		accommodationPersons( state )
		{
			return state.persons;
		},

		/**
		 * Get sort
		 *
		 * @param state
		 * @returns {string|*}
		 */
		accommodationSort( state )
		{
			return state.sort;
		},

		/**
		 * get min price
		 *
		 * @param state
		 * @returns {string|*}
		 */
		accommodationMinPrice( state )
		{
			return state.minPrice;
		},

		/**
		 * Get max price
		 *
		 * @param state
		 * @returns {string|*}
		 */
		accommodationMaxPrice( state )
		{
			return state.maxPrice;
		},

		/**
		 * Get cancellation option
		 *
		 * @param state
		 * @returns {string|*}
		 */
		accommodationCancellation( state )
		{
			return state.cancellation;
		},

		/**
		 * Get meal options
		 *
		 * @param state
		 * @returns {string|*}
		 */
		accommodationMeals( state )
		{
			return state.meals;
		},

		/**
		 * Get property types
		 *
		 * @param state
		 * @returns {string|*}
		 */
		accommodationPropertyType( state )
		{
			return state.propertyType;
		},

		/**
		 * Get results limit
		 *
		 * @param state
		 * @returns {number|*}
		 */
		accommodationLimit( state )
		{
			return state.limit;
		},

		/**
		 * Get page offset
		 *
		 * @param state
		 * @returns {number|*}
		 */
		accommodationOffset( state )
		{
			return state.offset;
		},
	}
}