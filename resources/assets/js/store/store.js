import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';
import actions from './actions';
import mutations from './mutations';


import accommodation from './modules/accommodation';
import airport from './modules/airport';
import car from './modules/car';
import city from './modules/city';
import continent from './modules/continent';
import country from './modules/country';
import currency from './modules/currency';
import flight from './modules/flight';
import language from './modules/language';
import timezone from './modules/timezone';
import user from './modules/user';

Vue.use( Vuex );

export const store = new Vuex.Store({
	state: {
		currentDate: '',
		success: '',
		message: '',
		errors: []
	},
	getters,
	mutations,
	actions,

	modules: {
		accommodation,
		airport,
		car,
		city,
		continent,
		country,
		currency,
		flight,
		language,
		timezone,
		user,
	}
});