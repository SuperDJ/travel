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
const continentEdit = () => import( '@/pages/dashboard/continent/edit' );
const continentCreate = () => import( '@/pages/dashboard/continent/create' );

const dashboardCurrency = () => import( '@/pages/dashboard/currency' );
const currencyEdit = () => import( '@/pages/dashboard/currency/edit' );
const currencyCreate = () => import( '@/pages/dashboard/currency/create' );

const dashboardLanguage = () => import( '@/pages/dashboard/language' );
const languageEdit = () => import( '@/pages/dashboard/language/edit' );
const languageCreate = () => import( '@/pages/dashboard/language/create' );

const dashboardCountry = () => import( '@/pages/dashboard/country' );
const countryEdit = () => import( '@/pages/dashboard/country/edit' );
const countryCreate = () => import( '@/pages/dashboard/country/create' );

const dashboardTimezone = () => import( '@/pages/dashboard/timezone' );
const timezoneEdit = () => import( '@/pages/dashboard/timezone/edit' );
const timezoneCreate = () => import( '@/pages/dashboard/timezone/create' );


const dashboardCity = () => import( '@/pages/dashboard/city' );
const cityEdit = () => import( '@/pages/dashboard/city/edit' );
const cityCreate = () => import( '@/pages/dashboard/city/create' );

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
					component: dashboardContinent,
				},
				{
					path: 'continents/create',
					name: 'continentCreate',
					meta: {
						title: 'Create continent'
					},
					component: continentCreate
				},
				{
					path: 'continents/:continent/edit',
					props: true,
					name: 'continentEdit',
					meta: {
						title: 'Edit continent'
					},
					component: continentEdit
				},
				{
					path: 'currencies',
					name: 'dashboardCurrency',
					meta: {
						title: 'Currencies'
					},
					component: dashboardCurrency,
				},
				{
					path: 'currencies/create',
					name: 'currencyCreate',
					meta: {
						title: 'Create currency'
					},
					component: currencyCreate
				},
				{
					path: 'currencies/:currency/edit',
					props: true,
					name: 'currencyEdit',
					meta: {
						title: 'Edit currency'
					},
					component: currencyEdit
				},
				{
					path: 'languages',
					name: 'dashboardLanguage',
					meta: {
						title: 'Language'
					},
					component: dashboardLanguage,
				},
				{
					path: 'languages/create',
					name: 'languageCreate',
					meta: {
						title: 'Create language'
					},
					component: languageCreate
				},
				{
					path: 'languages/:language/edit',
					props: true,
					name: 'languageEdit',
					meta: {
						title: 'Edit language'
					},
					component: languageEdit
				},
				{
					path: 'countries',
					name: 'dashboardCountry',
					meta: {
						title: 'Country'
					},
					component: dashboardCountry,
				},
				{
					path: 'countries/create',
					name: 'countryCreate',
					meta: {
						title: 'Create country'
					},
					component: countryCreate
				},
				{
					path: 'countries/:country/edit',
					props: true,
					name: 'countryEdit',
					meta: {
						title: 'Edit country'
					},
					component: countryEdit
				},
				{
					path: 'timezones',
					name: 'dashboardTimezone',
					meta: {
						title: 'Timezone'
					},
					component: dashboardTimezone,
				},
				{
					path: 'timezones/create',
					name: 'timezoneCreate',
					meta: {
						title: 'Create timezone'
					},
					component: timezoneCreate
				},
				{
					path: 'timezones/:timezone/edit',
					props: true,
					name: 'timezoneEdit',
					meta: {
						title: 'Edit timezone'
					},
					component: timezoneEdit
				},
				{
					path: 'cities',
					name: 'dashboardCity',
					meta: {
						title: 'City'
					},
					component: dashboardCity,
				},
				{
					path: 'cities/create',
					name: 'cityCreate',
					meta: {
						title: 'Create city'
					},
					component: cityCreate
				},
				{
					path: 'cities/:city/edit',
					props: true,
					name: 'cityEdit',
					meta: {
						title: 'Edit city'
					},
					component: cityEdit
				}
			]
		}
	]
});