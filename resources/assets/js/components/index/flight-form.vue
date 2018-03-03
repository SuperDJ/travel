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
                                item-value="id"
                                cache-items
                                :search-input.sync="departureSearch"
                                v-model.number="departure"
                            />
                            <v-text-field label="Departure date" type="date" v-model="departureDate" :min="setCurrentDate()" required />
                        </v-flex>

                        <v-flex xs3>
                            <v-select
                                label="Destination"
                                required
                                autocomplete
                                :items="airports"
                                item-text="name"
                                cache-items
                                :search-input.sync="destinationSearch"
                                item-value="id"
                                v-model.number="destination"
                            />
                            <v-text-field label="Return date" type="date" v-model="destinationDate" :min="departureDate" />
                        </v-flex>

                        <v-flex xs3>
                            <v-text-field label="Number of adults" type="number" min="1" required v-model.number="adults" />
                            <v-text-field label="Number of children <em>(1 - 16 years)</em>" type="number" min="0"
                                          max="8" v-model.number="children" />
                            <v-text-field label="Number of infants <em>(under 12 months)</em>" type="number" min="0"
                                          max="8" v-model.number="infants"/>
                        </v-flex>

                        <v-flex xs3>
                            <v-select
                                :items="cabinClasses"
                                label="Cabin class"
                                single-line
                                bottom
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
	const cabinClasses = [
		{text: 'Economy', value: 'economy'},
		{text: 'Economy plus', value: 'premiumeconomy'},
		{text: 'Business', value: 'business'},
		{text: 'First', value: 'first'}
	];

    export default {
    	data() {
    	    return {
    	    	airports: [],
                errors: {},
    	    	loading: false,
                departureSearch: null,
                destinationSearch: null,
                cabinClasses
            }
        },

        props: {
    	    departure: {
    	    	type: Number,
                default: 0
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
    	    	type: Number,
                default: 0
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
                default: '',
                validator: ( value ) => {
                	if( value.length > 0 ) {
						let j = 0;
						for( let i = 0; i < cabinClasses.length; i++ ) {
							let cClass = cabinClasses[i];

							if( Object.values( cClass ).indexOf( value ) > -1 ) {
								j++;
							}
						}

						return j > 0;
					}

					return true;
                }
            }
        },

        methods: {
    		getAirports( value ) {
    			this.loading = true;
    			fetch(`/api/airports/${value}/search`)
                    .then(response => {return response.json()})
                    .then(response => {this.airports = Object.values(response)});
    			this.loading = false;
            } ,

            submit() {
    			let data = {
    				departure: this.departure,
                    departureDate: this.departureDate,
                    destination: this.destination,
                    destinationDate: this.destinationDate,
                    adults: this.adults,
                    children: this.children,
                    infants: this.infants,
                    cabinClass: this.cabinClass,
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
            }
        },

        watch: {
			departureSearch( value ) {
    			if( value && value.length > 2 ) {
    			    this.getAirports( value )
                }
            },

            destinationSearch( value ) {
    			if( value && value.length > 2 ) {
    			    this.getAirports( value )
                }
            }
        }
    }
</script>