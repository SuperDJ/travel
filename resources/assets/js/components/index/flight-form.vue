<template>
    <v-card hover>
        <v-card-text>
            <form @keyup.enter="submit" @submit.prevent="handleSubmit">
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
                            <v-text-field label="Departure time" type="date" v-model="departureDate" required />
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
                            <v-text-field label="Return date" type="date" v-model="destinationDate" />
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
                                :items="[
                                    {text: 'Economy', value: 'economy'},
                                    {text: 'Economy plus', value: 'premiumeconomy'},
                                    {text: 'Business', value: 'business'},
                                    {text: 'First', value: 'first'}
                                ]"
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
            <v-btn flat color="primary" @click.once="submit">
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
    	    	airports: [],
    	    	loading: false,
                departure: 0,
                departureDate: '',
                departureSearch: null,
                destinationDate: '',
                destination: 0,
                destinationSearch: null,
                adults: 0,
                children: 0,
                infants: 0,
                cabinClass: ''
            }
        },

        methods: {
    		getAirports( value ) {
    			console.log(value);
    			this.loading = true;
    			fetch(`/api/airports/${value}/search`)
                    .then(response => {return response.json()})
                    .then(response => {this.airports = Object.values(response)});
    			this.loading = false;
            } ,

            handleSubmit(e) {
    			console.log(e);
    			let data = {
    				departure: this.departure,
                    departureDate: this.departureDate,
                    destination: this.destination,
                    destinationDate: this.destinationDate,
                    adults: this.adults,
                    children: this.children,
                    infants: this.infants,
                };

                console.log(data);
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