import Vue from 'vue';
import Router from 'vue-router';

const Index = () => import('@/pages/web/Index');
const Flights = () => import('@/pages/web/Flights');

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Index',
			component: Index
		},
		{
			path: '/flights',
			name: 'Flights',
			component: Flights
		},
		{
			path: '/flights/:departure/:departureDate/:destination/:destinationDate/:adults/:children/:infants',
			props: true,
			name: 'FlightsSearch',
			component: Flights
		},
	]
});