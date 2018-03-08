<template>
    <v-card hover>
        <v-card-text>
            <form @keyup.enter="submit" @submit.prevent="submit">
                <v-container grid-list-md>
                    <v-layout row wrap>
                        <v-flex xs3>
                            <v-select
                                label="Departure"
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
                            <v-text-field label="Departure date" type="date" v-model="departureDate" :min="currentDate" required />
                        </v-flex>

                        <v-flex xs3>
                            <v-select
                                label="Destination"
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
                            <v-text-field label="Return date" type="date" v-model="destinationDate" :min="departureDate" />
                        </v-flex>

                        <v-flex xs3>
                            <v-text-field label="Number of adults" type="number" min="1" required v-model.number="adults" />
                            <v-text-field label="Number of children (1 - 16 years)" type="number" min="0" max="8" v-model.number="children" />
                            <v-text-field label="Number of infants (under 12 months)" type="number" min="0" max="8" v-model.number="infants" />
                        </v-flex>

                        <v-flex xs3>
                            <v-select
                                :items="cabinClasses"
                                label="Cabin class"
                                single-line
                                bottom
                                required
                                v-model="cabinClass"
                            />
                        </v-flex>
                    </v-layout>
                </v-container>
            </form>
        </v-card-text>

        <v-card-actions>
            <v-btn flat color="primary" @click="submit">
                <v-icon>search</v-icon>
                Search flights
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default
    {
    	data()
        {
    	    return {
                errors: {},
    	    	loading: false,
                departureSearch: null,
                destinationSearch: null,
            }
        },

        computed: {
			/**
             * Get all searched airports
             *
			 * @returns {any[]}
			 */
			airports()
            {
    	        return Object.values( this.$store.getters.airportSearch );
            },

			/**
             * Get all cabin classes
             *
			 * @returns {computed.cabinClasses|mutations.cabinClasses|getters.cabinClasses|cabinClasses|*[]}
			 */
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
             * Search for an airport
             *
			 * @param value
			 */
			airportSearch( value )
            {
            	if( value && value.length >= 3 )
            	{
					this.loading = true;
					this.$store.dispatch( 'airportSearch', value );
					this.loading = false;
				}
            },

			/**
             * Send the user to the flights page
			 */
			submit()
			{
    			this.$router.push({name: 'Flights'});
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

        created() {
    		this.$store.commit(' currentDate' );
        }
    }
</script>