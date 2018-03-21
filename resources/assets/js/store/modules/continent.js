export default
{
	state: {
		all: []
	},

	mutations: {
		/**
		 * Set all continents
		 *
		 * @param state
		 * @param continents
		 */
		continentIndex( state, continents )
		{
			state.all = continents;
		}
	},

	actions: {
		/**
		 * Get all continents from API
		 *
		 * @param context
		 * @param pagination
		 */
		continentIndex( context, pagination )
		{
			let url = '/api/continents';
			if( pagination && Object.keys( pagination ).length > 1 )
			{
				url += `?${Object.keys( pagination ).map( key =>  `${key}=${pagination[ key ]}` ).join( '&' ) }`;
			}
			return fetch( url, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Accept': 'application/json'
				}
			})
				.then( response => response.json() )
				.then( response => context.commit( 'continentIndex', response ) )
				.catch( error => console.error( 'continentIndex', error ) );
		},

		/**
		 * Store continent in DB
		 *
		 * @param context
		 * @param data
		 * @returns {Promise<any>}
		 */
		continentStore( context, data )
		{
			console.log(data);
			return fetch( '/api/continents', {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-token': window.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				},
				method: 'POST',
				body: JSON.stringify( data )
			})
				.then( response => response.json() )
				.then( response => {
					if( response.errors ) {
						context.commit( 'errors', response.errors );
					} else {
						context.commit( 'errors', []);
					}
					context.commit( 'message', response.message );
					context.commit( 'success', response.success );
				})
				.catch( error => console.error( 'continentStore', error ) );
		}
	},

	getters: {
		/**
		 * Get all continents
		 *
		 * @param state
		 * @returns {{}|state.all|*}
		 */
		continentIndex( state )
		{
			if( state.all.data )
			{
				return state.all.data;
			} else {
				return state.all;
			}
		},

		continentTotal( state )
		{
			return state.all.total;
		}
	}
}