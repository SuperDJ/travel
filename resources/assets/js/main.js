import Vue from 'vue';
import { store } from './store/store';
import router from './router';
import Meta from 'vue-meta';

Vue.use(Meta);

/**************************************
 * Import global components
 **************************************/
import Index from './pages/web/Index';
import Icon from './components/Icon';
import Button from './components/Button';

Vue.component('Icon', Icon);
Vue.component('Button', Button);

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(Index)
});