import Vue from 'vue';
import { store } from '@/store/store';
import Router from 'vue-router';

const Web = () => import( '@/layouts/Web' );
const Index = () => import( '@/pages/web/Index' );
const Flights = () => import( '@/pages/web/Flights' );

const Account = () => import( '@/layouts/LoginRegister' );
const Register = () => import( '@/pages/dashboard/Register' );
const Login = () => import( '@/pages/dashboard/Login' );

const Dashboard = () => import( '@/layouts/Dashboard' );
const Overview = () => import( '@/pages/dashboard/Overview' );

Vue.use( Router );

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: Web,
			children: [
				{
					path: '',
					name: 'Index',
					component: Index
				},
				{
					path: '/flights',
					name: 'Flights',
					component: Flights
				},
				{
					path: '/flights/:departure/:departureDate/:destination/:destinationDate/:adults/:children/:infants/:cabinClass',
					props: true,
					name: 'FlightsSearch',
					component: Flights
				},
			]
		},
		{
			path: '/account',
			component: Account,
			children: [
				{
					path: 'register',
					name: 'Register',
					component: Register,
				},
				{
					path: 'login',
					name: 'Login',
					component: Login
				}
			]
		},
		{
			path: '/dashboard',
			component: Dashboard,
			beforeEnter: ( to, from, next ) => {
				if( store.getters.userLoggedIn )
				{
					next();
				} else {
					next( false );
				}
			},
			children: [
				{
					path: 'overview',
					name: 'Overview',
					component: Overview
				}
			]
		}
	]
});