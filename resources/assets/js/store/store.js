import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';
import actions from './actions';
import mutations from './mutations';

import continent from './modules/continent';
import airport from './modules/airport';
import flight from './modules/flight';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {},
	getters,
	mutations,
	actions,

	modules: {
		continent,
		airport,
		flight,
	}
});