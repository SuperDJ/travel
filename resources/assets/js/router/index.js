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

const userIndex = () => import( '@/pages/dashboard/users' );
const userEdit = () => import( '@/pages/dashboard/users/edit' );

const continentIndex = () => import( '@/pages/dashboard/continent' );
const continentEdit = () => import( '@/pages/dashboard/continent/edit' );
const continentCreate = () => import( '@/pages/dashboard/continent/create' );

const currencyIndex = () => import( '@/pages/dashboard/currency' );
const currencyEdit = () => import( '@/pages/dashboard/currency/edit' );
const currencyCreate = () => import( '@/pages/dashboard/currency/create' );

const languageIndex = () => import( '@/pages/dashboard/language' );
const languageEdit = () => import( '@/pages/dashboard/language/edit' );
const languageCreate = () => import( '@/pages/dashboard/language/create' );

const countryIndex = () => import( '@/pages/dashboard/country' );
const countryEdit = () => import( '@/pages/dashboard/country/edit' );
const countryCreate = () => import( '@/pages/dashboard/country/create' );

const timezoneIndex = () => import( '@/pages/dashboard/timezone' );
const timezoneEdit = () => import( '@/pages/dashboard/timezone/edit' );
const timezoneCreate = () => import( '@/pages/dashboard/timezone/create' );

const cityIndex = () => import( '@/pages/dashboard/city' );
const cityEdit = () => import( '@/pages/dashboard/city/edit' );
const cityCreate = () => import( '@/pages/dashboard/city/create' );

const airportIndex = () => import( '@/pages/dashboard/airport' );
const airportEdit = () => import( '@/pages/dashboard/airport/edit' );
const airportCreate = () => import( '@/pages/dashboard/airport/create' );

const airlineIndex = () => import( '@/pages/dashboard/airline' );
const airlineEdit = () => import( '@/pages/dashboard/airline/edit' );
const airlineCreate = () => import( '@/pages/dashboard/airline/create' );

const roleIndex = () => import( '@/pages/dashboard/role' );
const roleEdit = () => import( '@/pages/dashboard/role/edit' );
const roleCreate = () => import( '@/pages/dashboard/role/create' );

const permissionIndex = () => import( '@/pages/dashboard/permission' );
const permissionEdit = () => import( '@/pages/dashboard/permission/edit' );
const permissionCreate = () => import( '@/pages/dashboard/permission/create' );

Vue.use( Router );

const routes = [
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
		meta: {
			auth: true
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
				name: 'userIndex',
				meta: {
					title: 'Users'
				},
				component: userIndex
			},
			{
				path: 'users/:user/edit',
				name: 'userEdit',
				props: true,
				meta: {
					title: 'Edit user'
				},
				component: userEdit
			},
			{
				path: 'continents',
				name: 'continentIndex',
				meta: {
					title: 'Continents'
				},
				component: continentIndex,
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
				name: 'currencyIndex',
				meta: {
					title: 'Currencies'
				},
				component: currencyIndex,
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
				name: 'languageIndex',
				meta: {
					title: 'Language'
				},
				component: languageIndex,
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
				name: 'countryIndex',
				meta: {
					title: 'Country'
				},
				component: countryIndex,
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
				name: 'timezoneIndex',
				meta: {
					title: 'Timezone'
				},
				component: timezoneIndex,
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
				name: 'cityIndex',
				meta: {
					title: 'City'
				},
				component: cityIndex,
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
			},
			{
				path: 'airports',
				name: 'airportIndex',
				meta: {
					title: 'Airports'
				},
				component: airportIndex,
			},
			{
				path: 'airports/create',
				name: 'airportCreate',
				meta: {
					title: 'Create airport'
				},
				component: airportCreate
			},
			{
				path: 'airports/:airport/edit',
				props: true,
				name: 'airportEdit',
				meta: {
					title: 'Edit airport'
				},
				component: airportEdit
			},
			{
				path: 'airlines',
				name: 'airlineIndex',
				meta: {
					title: 'Airlines'
				},
				component: airlineIndex,
			},
			{
				path: 'airlines/create',
				name: 'airlineCreate',
				meta: {
					title: 'Create airline'
				},
				component: airlineCreate
			},
			{
				path: 'airlines/:airline/edit',
				props: true,
				name: 'airlineEdit',
				meta: {
					title: 'Edit airline'
				},
				component: airlineEdit
			},
			{
				path: 'roles',
				name: 'roleIndex',
				meta: {
					title: 'Roles'
				},
				component: roleIndex,
			},
			{
				path: 'roles/create',
				name: 'roleCreate',
				meta: {
					title: 'Create role'
				},
				component: roleCreate
			},
			{
				path: 'roles/:role/edit',
				props: true,
				name: 'roleEdit',
				meta: {
					title: 'Edit role'
				},
				component: roleEdit
			},
			{
				path: 'permissions',
				name: 'permissionIndex',
				meta: {
					title: 'Permissions'
				},
				component: permissionIndex,
			},
			{
				path: 'permissions/create',
				name: 'permissionCreate',
				meta: {
					title: 'Create permission'
				},
				component: permissionCreate
			},
			{
				path: 'permissions/:permission/edit',
				props: true,
				name: 'permissionEdit',
				meta: {
					title: 'Edit permission'
				},
				component: permissionEdit
			}
		]
	}
];

const router = new Router({
	mode: 'history',
	routes: routes
});

router.beforeEach( ( to, from, next ) => {
	if( to.matched[0].meta.auth || to.meta.auth )
	{
		if( store.getters.userLoggedIn )
		{
			next();
		} else {
			next( { name: 'login' } );
		}
	}

	next();
});


export default router;