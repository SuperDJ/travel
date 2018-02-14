import Vue from 'vue';

/**************************************
 * Import pages
 **************************************/
import Index from './pages/Index';

/**************************************
 * Import global components
 **************************************/
import Icon from './components/Icon';

Vue.component('Icon', Icon);

import store from './store/store';

new Vue({
	el: '#app',
	store,
	render: h => h(Index)
});