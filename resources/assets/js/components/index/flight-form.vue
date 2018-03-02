<template>
    <div>
        <v-card-text>
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
                            v-model="departure"
                        />
                        <v-text-field label="Departure time" type="date" required />
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
                            v-model="destination"
                        />
                        <v-text-field label="Return date" type="date"/>
                    </v-flex>

                    <v-flex xs3>
                        <v-text-field label="Number of adults" type="number" min="1" required/>
                        <v-text-field label="Number of children <em>(1 - 16 years)</em>" type="number" min="0" max="8"/>
                        <v-text-field label="Number of infants <em>(under 12 months)</em>" type="number" min="0" max="8"/>
                    </v-flex>

                    <v-flex xs3>
                        <v-select
                            :items="[
                                {text: 'Economy', value: 'economy'},
                                {text: 'Economy plus', value: 'premiumeconomy'},
                                {text: 'Business', value: 'business'},
                                {text: 'First', value: 'first'}
                            ]"
                            label="Class"
                            single-line
                            bottom
                        />
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-btn flat color="primary">
                <v-icon>search</v-icon>
                Search flights
            </v-btn>
        </v-card-actions>
    </div>
</template>

<script>
    export default {
    	data() {
    	    return {
    	    	airports: [],
    	    	loading: false,
                departure: 0,
                departureSearch: null,
                destination: 0,
                destinationSearch: null,
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