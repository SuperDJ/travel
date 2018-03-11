import Vue from 'vue';
import Vuetify from 'vuetify';
import { store } from './store/store';
import router from './router';
import Meta from 'vue-meta';
import VueProgressiveImage from 'vue-progressive-image';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(Meta);
Vue.use(Vuetify);
Vue.use(VueProgressiveImage);
Vue.use(VueGoogleMaps, {
	key: window.google,
	libraries: ''
});

Vue.component('c-image', () => import('@/components/Image'));

import Index from '@/layouts/Web';

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(Index)
});