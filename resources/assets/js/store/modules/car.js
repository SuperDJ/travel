export default
{
	state: {
		all: {},
		pickupPlace: '',
		pickupDateTime: '',
		dropoffPlace: '',
		dropoffDateTime: '',
		driverAge: '',
	},

	mutations: {
		/**
		 * Set pickup place
		 *
		 * @param state
		 * @param place
		 */
		carPickupPlace( state, place )
		{
			state.pickupPlace = place;
		},

		/**
		 * Set pickup date and time
		 *
		 * @param state
		 * @param dateTime
		 */
		carPickupDateTime( state, dateTime )
		{
			state.pickupDateTime = dateTime;
		},

		/**
		 * Set dropoff place
		 *
		 * @param state
		 * @param place
		 */
		carDropoffPlace( state, place )
		{
			state.dropoffPlace = place;
		},

		/**
		 * Set dropoff date and time
		 * @param state
		 * @param dateTime
		 */
		carDropoffDateTime( state, dateTime )
		{
			state.dropoffDateTime = dateTime;
		},

		/**
		 * Set driver age
		 *
		 * @param state
		 * @param age
		 */
		carDriverAge( state, age ) {
			state.driverAge = age;
		}
	},

	actions: {

	},

	getters: {
		/**
		 * Get pickup place
		 *
		 * @param state
		 * @returns {string|*}
		 */
		carPickupPlace( state )
		{
			return state.pickupPlace;
		},

		/**
		 * Get pickup date time
		 *
		 * @param state
		 * @returns {string|*}
		 */
		carPickupDateTime( state )
		{
			return state.pickupDateTime;
		},

		/**
		 * Get dropoff place
		 *
		 * @param state
		 * @returns {string|*}
		 */
		carDropoffPlace( state )
		{
			return state.dropoffPlace;
		},

		/**
		 * Get dropoff date and time
		 * @param state
		 * @returns {string|*}
		 */
		carDropoffDateTime( state )
		{
			return state.dropoffDateTime;
		},

		/**
		 * Get driver age
		 *
		 * @param state
		 * @returns {string|*}
		 */
		carDriverAge( state )
		{
			return state.driverAge;
		}
	}
}