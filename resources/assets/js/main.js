import Vue from 'vue';
import Vuetify from 'vuetify';
import { store } from './store/store';
import { i18n } from '@/i18n';
import router from './router';
import Meta from 'vue-meta';
import VueProgressiveImage from 'vue-progressive-image';
import permissions from '@/permissions';

Vue.use( Meta );
Vue.use( Vuetify );
Vue.use( VueProgressiveImage );

Vue.component( 'c-image', () => import( '@/components/Image' ) );

import App from '@/pages/App';

new Vue({
	el: '#app',
	i18n,
	store,
	router,
	permissions,
	render: h => h( App )
});

const language = navigator.language.substr( 0, 2 );
document.documentElement.lang = language;
window.language = language;

const token = document.head.querySelector( 'meta[name="csrf-token"]' ).getAttribute( 'content' );

if( token )
{
	window.token = token;
} else {
	console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

// Register service worker
if( 'serviceWorker' in navigator ) {
	window.addEventListener( 'load', () => {
		navigator.serviceWorker.register( '/service-worker.js' ).then( registration => {
			// Registration was successful
			console.log( 'ServiceWorker registration successful with scope: ', registration.scope );
		}, err => {
			// registration failed :(
			console.log( 'ServiceWorker registration failed: ', err );
		});
	});
}

// Add install banner
window.addEventListener('beforeinstallprompt', ( e ) =>  {
	e.userChoice.then( choiceResult => {
		console.log( choiceResult.outcome );

		if( choiceResult.outcome === 'dismissed' ) {
			console.log( 'User cancelled home screen install' );
		} else {
			console.log( 'User added to home screen' );
		}
	});
});