import Vue from 'vue';
import { store } from '@/store/store';
import Router from 'vue-router';

const web = () => import( '@/layouts/Web' );
const index = () => import( '@/pages/web/Index' );
const flights = () => import( '@/pages/web/Flights' );

const account = () => import( '@/layouts/LoginRegister' );
const register = () => import( '@/pages/dashboard/Register' );
const login = () => import( '@/pages/dashboard/Login' );

const dashboard = () => import( '@/layouts/Dashboard' );
const overview = () => import( '@/pages/dashboard/Overview' );
const dashboardUser = () => import( '@/pages/dashboard/users' );

const dashboardContinent = () => import( '@/pages/dashboard/continent' );

Vue.use( Router );

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: web,
			children: [
				{
					path: '',
					name: 'index',
					meta: {
						title: 'Home'
					},
					component: index
				},
				{
					path: 'flights',
					name: 'flights',
					meta: {
						title: 'Flights'
					},
					component: flights
				},
				{
					path: 'accommodations',
					name: 'accommodations',
					meta: {
						title: 'Flights'
					},
				},
				{
					path: 'car-rental',
					name: 'carRental',
					meta: {
						title: 'Car rental'
					},
				},
				{
					path: 'flights/:departure/:departureDate/:destination/:destinationDate/:adults/:children/:infants/:cabinClass',
					props: true,
					name: 'flightsSearch',
					meta: {
						title: 'Flight form :departure to :destination'
					},
					component: flights
				},
				{
					path: 'continent/:continent',
					props: true,
					name: 'continentShow',
					meta: {
						title: 'Continent :continent'
					},
				},
			]
		},
		{
			path: '/account',
			component: account,
			children: [
				{
					path: 'register',
					name: 'register',
					meta: {
						title: 'Register'
					},
					component: register,
					beforeEnter: ( to, form, next ) => {
						if( store.getters.userLoggedIn )
						{
							next( { name: 'dashboard' } )
						} else {
							next();
						}
					}
				},
				{
					path: 'login',
					name: 'login',
					meta: {
						title: 'Login'
					},
					component: login,
					beforeEnter: ( to, form, next ) => {
						if( store.getters.userLoggedIn )
						{
							next( { name: 'dashboard' } )
						} else {
							next();
						}
					}
				}
			]
		},
		{
			path: '/dashboard',
			component: dashboard,
			beforeEnter: ( to, from, next ) => {
				if( store.getters.userLoggedIn )
				{
					next();
				} else {
					next( { name: 'login' } );
				}
			},
			children: [
				{
					path: '',
					name: 'dashboard',
					meta: {
						title: 'Overview'
					},
					component: overview
				},
				{
					path: 'users',
					name: 'dashboardUser',
					meta: {
						title: 'Users'
					},
					component: dashboardUser
				},
				{
					path: 'continents',
					name: 'dashboardContinent',
					meta: {
						title: 'Continents'
					},
					component: dashboardContinent
				}
			]
		}
	]
});