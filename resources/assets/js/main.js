import Vue from 'vue';
import Vuetify from 'vuetify';
import { store } from './store/store';
import router from './router';
import Meta from 'vue-meta';
import VueProgressiveImage from 'vue-progressive-image';

Vue.use( Meta );
Vue.use( Vuetify );
Vue.use( VueProgressiveImage );

Vue.component( 'c-image', () => import( '@/components/Image' ) );

import App from '@/pages/App';

new Vue({
	el: '#app',
	store,
	router,
	render: h => h( App )
});

let token = document.head.querySelector( 'meta[name="csrf-token"]' ).getAttribute( 'content' );

if( token )
{
	window.token = token;
} else {
	console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}