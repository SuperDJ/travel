import Vue from 'vue';
import Vuetify from 'vuetify';
import { store } from './store/store';
import router from './router';
import Meta from 'vue-meta';

Vue.use(Meta);
Vue.use(Vuetify);

import Index from '@/layouts/Web';

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(Index)
});