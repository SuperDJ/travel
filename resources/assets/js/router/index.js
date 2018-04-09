import Vue from 'vue';
import { store } from '@/store/store';
import { i18n } from '@/i18n';
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
		path: '/:lang',
		props: true,
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
		path: '/:lang/account',
		component: account,
		props: true,
		children: [
			{
				path: 'register',
				name: 'register',
				meta: {
					title: i18n.t( 'user.register' )
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
					title: i18n.t( 'user.login' )
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
		path: '/:lang/dashboard',
		component: dashboard,
		props: true,
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
				component: overview,
			},
			{
				path: 'users',
				name: 'userIndex',
				meta: {
					title: i18n.tc( 'user.user', 1 ),
					permission: 'user.index'
				},
				component: userIndex,
			},
			{
				path: 'users/:user/edit',
				name: 'userEdit',
				props: true,
				meta: {
					title: i18n.t( 'user.edit' ),
					permission: 'user.edit'
				},
				component: userEdit,
			},
			{
				path: 'continents',
				name: 'continentIndex',
				meta: {
					title: i18n.tc( 'continent.continent', 1 )
				},
				component: continentIndex,
			},
			{
				path: 'continents/create',
				name: 'continentCreate',
				meta: {
					title: i18n.t( 'continent.create' )
				},
				component: continentCreate,
			},
			{
				path: 'continents/:continent/edit',
				props: true,
				name: 'continentEdit',
				meta: {
					title: i18n.t( 'continent.edit' )
				},
				component: continentEdit,
			},
			{
				path: 'currencies',
				name: 'currencyIndex',
				meta: {
					title: i18n.tc( 'currency.currency', 1 )
				},
				component: currencyIndex,
			},
			{
				path: 'currencies/create',
				name: 'currencyCreate',
				meta: {
					title: i18n.t( 'currency.create' )
				},
				component: currencyCreate,
			},
			{
				path: 'currencies/:currency/edit',
				props: true,
				name: 'currencyEdit',
				meta: {
					title: i18n.t( 'currency.edit' )
				},
				component: currencyEdit,
			},
			{
				path: 'languages',
				name: 'languageIndex',
				meta: {
					title: i18n.tc( 'language.language', 1 )
				},
				component: languageIndex,
			},
			{
				path: 'languages/create',
				name: 'languageCreate',
				meta: {
					title: i18n.t( 'language.create' )
				},
				component: languageCreate,
			},
			{
				path: 'languages/:language/edit',
				props: true,
				name: 'languageEdit',
				meta: {
					title: i18n.t( 'language.edit' )
				},
				component: languageEdit,
			},
			{
				path: 'countries',
				name: 'countryIndex',
				meta: {
					title: i18n.tc( 'country.country', 1 )
				},
				component: countryIndex,
			},
			{
				path: 'countries/create',
				name: 'countryCreate',
				meta: {
					title: i18n.t( 'country.create' )
				},
				component: countryCreate,
			},
			{
				path: 'countries/:country/edit',
				props: true,
				name: 'countryEdit',
				meta: {
					title: i18n.t( 'country.edit' )
				},
				component: countryEdit,
			},
			{
				path: 'timezones',
				name: 'timezoneIndex',
				meta: {
					title: i18n.tc( 'timezone.timezone', 1 )
				},
				component: timezoneIndex,
			},
			{
				path: 'timezones/create',
				name: 'timezoneCreate',
				meta: {
					title: i18n.t( 'timezone.create' )
				},
				component: timezoneCreate,
			},
			{
				path: 'timezones/:timezone/edit',
				props: true,
				name: 'timezoneEdit',
				meta: {
					title: i18n.t( 'timezone.edit' )
				},
				component: timezoneEdit,
			},
			{
				path: 'cities',
				name: 'cityIndex',
				meta: {
					title: i18n.tc( 'city.city', 1 )
				},
				component: cityIndex,
			},
			{
				path: 'cities/create',
				name: 'cityCreate',
				meta: {
					title: i18n.t( 'city.create' )
				},
				component: cityCreate,
			},
			{
				path: 'cities/:city/edit',
				props: true,
				name: 'cityEdit',
				meta: {
					title: i18n.t( 'city.edit' )
				},
				component: cityEdit,
			},
			{
				path: 'airports',
				name: 'airportIndex',
				meta: {
					title: i18n.tc( 'airport.airport', 1 )
				},
				component: airportIndex,
			},
			{
				path: 'airports/create',
				name: 'airportCreate',
				meta: {
					title: i18n.t( 'airport.create' )
				},
				component: airportCreate,
			},
			{
				path: 'airports/:airport/edit',
				props: true,
				name: 'airportEdit',
				meta: {
					title: i18n.t( 'airport.edit' )
				},
				component: airportEdit,
			},
			{
				path: 'airlines',
				name: 'airlineIndex',
				meta: {
					title: i18n.tc( 'airline.airline', 1 )
				},
				component: airlineIndex,
			},
			{
				path: 'airlines/create',
				name: 'airlineCreate',
				meta: {
					title: i18n.t( 'airline.create' )
				},
				component: airlineCreate,
			},
			{
				path: 'airlines/:airline/edit',
				props: true,
				name: 'airlineEdit',
				meta: {
					title: i18n.t( 'airline.edit' )
				},
				component: airlineEdit,
			},
			{
				path: 'roles',
				name: 'roleIndex',
				meta: {
					title: i18n.tc( 'role.role', 1 )
				},
				component: roleIndex,
			},
			{
				path: 'roles/create',
				name: 'roleCreate',
				meta: {
					title: i18n.t( 'role.create' )
				},
				component: roleCreate,
			},
			{
				path: 'roles/:role/edit',
				props: true,
				name: 'roleEdit',
				meta: {
					title: i18n.t( 'role.edit' )
				},
				component: roleEdit,
			},
			{
				path: 'permissions',
				name: 'permissionIndex',
				meta: {
					title: i18n.tc( 'permission.permission', 1 )
				},
				component: permissionIndex,
			},
			{
				path: 'permissions/create',
				name: 'permissionCreate',
				meta: {
					title: i18n.t( 'permission.create' )
				},
				component: permissionCreate,
			},
			{
				path: 'permissions/:permission/edit',
				props: true,
				name: 'permissionEdit',
				meta: {
					title: i18n.t( 'permission.edit' )
				},
				component: permissionEdit,
			}
		]
	}
];

const router = new Router({
	mode: 'history',
	routes: routes
});

router.beforeEach( ( to, from, next ) =>
{
	// Set the language prop
	let language = to.params.lang;
	if( !language )
	{
		language = 'en';
		next( { path: `/${language}${to.path}` } );
	} else {
		i18n.locale = language;
	}

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