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
		carPickupPlace( state, place )
		{
			state.pickupPlace = place;
		},

		carPickupDateTime( state, dateTime )
		{
			state.pickupDateTime = dateTime;
		},

		carDropoffPlace( state, place )
		{
			state.dropoffPlace = place;
		},

		carDropoffDateTime( state, dateTime )
		{
			state.dropoffDateTime = dateTime;
		},

		carDriverAge( state, age ) {
			state.driverAge = age;
		}
	},

	actions: {

	},

	getters: {
		carPickupPlace( state )
		{
			return state.pickupPlace;
		},

		carPickupDateTime( state )
		{
			return state.pickupDateTime;
		},

		carDropoffPlace( state )
		{
			return state.dropoffPlace;
		},

		carDropoffDateTime( state )
		{
			return state.dropoffDateTime;
		},

		carDriverAge( state )
		{
			return state.driverAge;
		}
	}
}