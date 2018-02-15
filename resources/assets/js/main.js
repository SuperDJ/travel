import Vue from 'vue';

/**************************************
 * Import pages
 **************************************/
import Index from './pages/Index';

/**************************************
 * Import global components
 **************************************/
import Icon from './components/Icon';
import Button from './components/Button';

Vue.component('Icon', Icon);
Vue.component('Button', Button);

import { store } from './store/store';
import { WebRoutes } from './routes/web-routes';

new Vue({
	el: '#app',
	store,
	render: h => h(Index)
});