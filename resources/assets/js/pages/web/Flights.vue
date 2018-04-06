<template>
    <v-container fluid grid-list-lg style="margin-top:60px">
        <div v-if="coords.length > 1">
            <google-map
                name="flight"
                :center="{lat: 0, lng: 0}"
                :markers="coords"
                :polyline-coords="coords"
                polyline-color="#1976d2"
                :polyline-width="5"
            />
        </div>
        <div v-else>
            <v-parallax
                src="https://images.pexels.com/photos/219014/pexels-photo-219014.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb" alt="Flight logo" height="700" />
        </div>

        <v-layout row wrap>
            <v-flex xs3>
                <v-card flat>
                    <form @keyup.enter="searchFlight()" @submit.prevent="searchFlight()">
                        <v-card-text>
                            <v-select
                                :label="$t( 'flight.departure' )"
                                required
                                autocomplete
                                :items="airports"
                                item-text="name"
                                item-value="iata"
                                no-data="No results found"
                                cache-items
                                :search-input.sync="departureSearch"
                                v-model.number="departure"
                            >
                                <template slot="selected" slot-scope="data">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{data.item.name}}</v-list-tile-title>
                                    </v-list-tile-content>
                                </template>

                                <template slot="item" slot-scope="data">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{data.item.name}}</v-list-tile-title>
                                        <v-list-tile-sub-title>
                                            <div v-if="data.item.city && data.item.city.country">Country: {{data.item.city.country.name}}</div>
                                            <div v-if="data.item.city">City: {{data.item.city.name}}</div>
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </template>
                            </v-select>
                            <v-text-field :label="$t( 'flight.departureDate' )" type="date" v-model="departureDate"
                                          :min="currentDate" required />

                            <v-select
                                :label="$t( 'flight.destination' )"
                                required
                                autocomplete
                                :items="airports"
                                item-text="name"
                                item-value="iata"
                                no-data="No results found"
                                cache-items
                                :search-input.sync="destinationSearch"
                                v-model.number="destination"
                            >
                                <template slot="item" slot-scope="data">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{data.item.name}}</v-list-tile-title>
                                        <v-list-tile-sub-title>
                                            <div v-if="data.item.city && data.item.city.country">Country: {{data.item.city.country.name}}</div>
                                            <div v-if="data.item.city">City: {{data.item.city.name}}</div>
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </template>
                            </v-select>
                            <v-text-field :label="$t( 'flight.returnDate' )" type="date" v-model="destinationDate"
                                          :min="departureDate" />

                            <v-text-field :label="$t( 'flight.numberOfAdults' )" type="number" min="1" required
                                          v-model.number="adults" />
                            <v-text-field :label="$t( 'flight.numberOfChildren' )" type="number" min="0" max="8"
                                          v-model.number="children" />
                            <v-text-field :label="$t( 'flight.numberOfInfants' )" type="number" min="0" max="8"
                                          v-model.number="infants" />

                            <v-select
                                :items="cabinClasses"
                                :label="$t( 'flight.cabinClass' )"
                                single-line
                                bottom
                                required
                                v-model="cabinClass"
                            />
                        </v-card-text>

                        <v-card-actions>
                            <v-btn flat color="primary" type="submit">
                                <v-icon>search</v-icon>
                                Search
                            </v-btn>
                        </v-card-actions>
                    </form>
                </v-card>
            </v-flex>

            <v-flex xs9>
                <div v-if="flights.length > 1">
                    <v-card hover v-for="( flight, i ) in flights" :key="i" style="margin-bottom:16px">
                        <v-card-text>
                            <img :src="airlineImage(flight.to.carrier.iso)" :alt="flight.to.carrier.name" width="300">
                            {{flight.to.origin.city.name}} {{flight.to.origin.city.country.name}}
                            <v-icon>chevron_right</v-icon>
                            {{flight.to.destination.city.name}} {{ flight.to.destination.city.country.name}}

                            <div v-if="flight.return">
                                <v-divider />

                                <img :src="airlineImage(flight.return.carrier.iso)" :alt="flight.return.carrier.name" width="300">
                                {{flight.return.origin.city.name}} {{flight.return.origin.city.country.name}}
                                <v-icon>chevron_left</v-icon>
                                {{flight.return.destination.city.name}} {{ flight.return.destination.city.country.name}}
                            </div>
                        </v-card-text>

                        <v-flex xs12 class="blue darken-4 white--text text-xs-right headline">
                            {{flight.price}} {{ $t( 'flight.perPerson' ) }}
                        </v-flex>
                    </v-card>
                </div>

                <div v-else-if="flights.length === 0 && departure.length >= 1 && destination.length >= 1 && departureDate.length >= 1">
                    <v-alert type="error" value="true">{{ $tc( 'flight.result', 2 ) }}</v-alert>
                    <c-image src="/flight-error.png" alt="Flights error"/>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import GoogleMap from '@/components/Map';

    export default
    {
		metaInfo: {
			title: 'Flights'
		},

        components: {
	        'google-map': GoogleMap,
        },

		data()
		{
			return {
				departureSearch: null,
				destinationSearch: null,
                coords: [],
			}
		},

        computed: {
			airports() {
			    return Object.values( this.$store.getters.airportSearch );
            },

		    flights()
            {
                return this.$store.getters.browseQuotes;
            },

			cabinClasses()
			{
				return this.$store.getters.cabinClasses;
			},

            currentDate()
            {
                return this.$store.getters.currentDate;
            },

            departure: {
                get()
                {
                    return this.$store.getters.flightDeparture;
                },
                set( value )
                {
                    this.$store.commit( 'flightDeparture', value );
                }
            },

            departureDate: {
                get()
                {
                    return this.$store.getters.flightDepartureDate;
                },
                set( value )
                {
                    this.$store.commit( 'flightDepartureDate', value );
                }
            },

            destination: {
                get()
                {
                    return this.$store.getters.flightDestination;
                },
                set( value )
                {
                    this.$store.commit( 'flightDestination', value );
                }
            },

            destinationDate: {
                get()
                {
                    return this.$store.getters.flightDestinationDate;
                },
                set( value )
                {
                    this.$store.commit( 'flightDestinationDate', value );
                }
            },

            adults: {
                get()
                {
                    return this.$store.getters.flightAdults;
                },
                set( value )
                {
                    this.$store.commit( 'flightAdults', value );
                }
            },

            children: {
                get()
                {
                    return this.$store.getters.flightChildren;
                },
                set( value )
                {
                    this.$store.commit( 'flightChildren', value );
                }
            },

            infants: {
                get()
                {
                    return this.$store.getters.flightInfants;
                },
                set( value )
                {
                    this.$store.commit( 'flightInfants', value );
                }
            },

            cabinClass: {
                get()
                {
                    return this.$store.getters.flightCabinClass;
                },
                set( value )
                {
                    this.$store.commit( 'flightCabinClass', value );
                }
            },
        },

        methods: {
			/**
             * Search for a flight
			 */
			searchFlight()
            {
            	if( this.departure && this.destination && this.departureDate ) {
					let data = {
						departure: this.departure,
						departureDate: this.departureDate,
						destination: this.destination,
						destinationDate: this.destinationDate,
						adults: this.adults,
						children: this.children,
						infants: this.infants,
						cabinClass: this.cabinClass,
						country: 'NL',
						currency: 'EUR',
						language: 'NL'
					};

					fetch(`/api/airports/${this.departure}/search`)
                        .then( response => { return response.json() } )
                        .then( response => { this.coords.push( { lat: parseFloat( response[0].latitude ), lng: parseFloat( response[0].longitude ) } ) } );

					fetch(`/api/airports/${this.destination}/search`)
                        .then( response => { return response.json() } )
                        .then( response => { this.coords.push( { lat: parseFloat( response[0].latitude ), lng: parseFloat( response[0].longitude ) } ) } );

					console.log(data);

					this.$store.dispatch( 'browseQuotes', data );
				}
            },

			/**
             * If a location has been filled in get the corresponding details
			 */
			setSearchedAirports()
			{
				if( this.departure ) {
					this.$store.dispatch( 'airportSearch', this.departure );
				}

				if( this.destination ) {
					this.$store.dispatch( 'airportSearch', this.destination );
				}
			},

			/**
             * Search for an airport
             *
			 * @param value
			 */
			airportSearch( value )
            {
                if( value && value.length >= 3 ) {
                	this.$store.dispatch( 'airportSearch', value );
                }
            },

			/**
             * Return
			 * @param airline
			 * @returns {string}
			 */
			airlineImage( airline )
            {
				return `https://daisycon.io/images/airline/?width=300&height=150&iata=${ airline }`;
            },
        },

		watch: {
			departureSearch( value )
			{
				this.airportSearch( value );
			},

			destinationSearch( value )
			{
				this.airportSearch( value );
			}
		},

		created()
		{
			this.setSearchedAirports();
			this.searchFlight();
			this.$store.commit( 'currentDate' );
        }
    }
</script>