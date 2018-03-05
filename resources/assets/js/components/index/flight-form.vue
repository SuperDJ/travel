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
                                v-model.number="mDeparture"
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
                            <v-text-field label="Departure date" type="date" v-model="mDepartureDate" :min="setCurrentDate()" required />
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
                                v-model.number="mDestination"
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
                            <v-text-field label="Return date" type="date" v-model="mDestinationDate" :min="mDepartureDate" />
                        </v-flex>

                        <v-flex xs3>
                            <v-text-field label="Number of adults" type="number" min="1" required v-model.number="mAdults" />
                            <v-text-field label="Number of children <em>(1 - 16 years)</em>" type="number" min="0" max="8" v-model.number="mChildren" />
                            <v-text-field label="Number of infants <em>(under 12 months)</em>" type="number" min="0" max="8" v-model.number="mInfants"/>
                        </v-flex>

                        <v-flex xs3>
                            <v-select
                                :items="cabinClasses"
                                label="Cabin class"
                                single-line
                                bottom
                                v-model="mCabinClass"
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
    export default {
    	data() {
    	    return {
                errors: {},
    	    	loading: false,
                departureSearch: null,
                destinationSearch: null,
                mDeparture: this.departure,
                mDepartureDate: this.departureDate,
                mDestination: this.destination,
                mDestinationDate: this.destinationDate,
                mAdults: this.adults,
                mChildren: this.children,
                mInfants: this.infants,
                mCabinClass: this.cabinClass
            }
        },

        props: {
    	    departure: {
    	    	type: String,
                default: ''
            },
            departureDate: {
    	    	type: String,
                default: '',
                validator: ( value ) => {
                	if( value.length > 0 ) {
						return /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test( value );
					}

					return true;
                }
            },
            destination: {
    	    	type: String,
                default: ''
            },
            destinationDate: {
    	    	type: String,
                default: '',
				validator: ( value ) => {
                	if( value.length > 0 ) {
						return /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test( value );
					}

					return true;
				}
            },
            adults: {
    	    	type: Number,
                default: 0,
                validator: ( value ) => {
                	if( value.length > 0 ) {
						return value >= 1
					}

					return true;
                }
            },
            children: {
    	    	type: Number,
                default: 0,
                validator: ( value ) => {
                	if( value.length > 0 ) {
						return value => 0 && value <= 8;
					}

					return true;
                }
            },
            infants: {
    	        type: Number,
                default: 0,
				validator: ( value ) => {
                	if( value.length > 0 ) {
						return value => 0 && value <= 8;
					}

					return true;
				}
            },
            cabinClass: {
    	    	type: String,
                default: ''
            }
        },

        computed: {
    		airports() {
    	        return Object.values(this.$store.getters.searchAirport);
            },

			cabinClasses() {
				return this.$store.getters.cabinClasses;
			}
        },

        methods: {
    		searchAirports( value ) {
    			this.loading = true;
    			this.$store.dispatch('searchAirport', value);
    			this.loading = false;
            },

            submit() {
    			let data = {
    				departure: this.mDeparture,
                    departureDate: this.mDepartureDate,
                    destination: this.mDestination,
                    destinationDate: this.mDestinationDate,
                    adults: this.mAdults,
                    children: this.mChildren,
                    infants: this.mInfants,
                    cabinClass: this.mCabinClass,
                };

    			this.$router.push({name: 'FlightsSearch', params: data});
            },

            setCurrentDate() {
    		    let date = new Date(),
                    dd = date.getDate(),
                    mm = date.getMonth() + 1,
                    yy = date.getFullYear();

    		    if( dd < 10 ) {
    		    	dd = `0${dd}`;
                }

                if( mm < 10 ) {
    		    	mm = `0${mm}`;
                }

                return `${yy}-${mm}-${dd}`;
            },

            setSearchedAirports() {
    			if( this.mDeparture ) {
					this.$store.dispatch('searchAirport', this.mDeparture);
                }

                if( this.mDestination ) {
					this.$store.dispatch('searchAirport', this.mDestination);
                }
            }
        },

        watch: {
			departureSearch( value ) {
    			if( value && value.length > 2 ) {
    			    this.searchAirports( value )
                }
            },

            destinationSearch( value ) {
    			if( value && value.length > 2 ) {
    			    this.searchAirports( value )
                }
            }
        },

        created() {
    		this.setSearchedAirports();
        }
    }
</script>