<template>
    <v-card hover>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout row wrap>
                    <v-flex xs4>
                        <v-select
                            :label="$t( 'carRental.pickup' )"
                            required
                            autocomplete
                            :items="cities"
                            item-text="name"
                            item-value="id"
                            no-data="No results found"
                            cache-items
                            :search-input.sync="pickupSearch"
                            v-model.number="pickupPlace"
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
                                        <div v-if="data.item.country">Country: {{data.item.country.name}}</div>
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                            </template>
                        </v-select>
                        <v-text-field :label="$t( 'carRental.pickupDate' )" type="datetime-local"
                                      v-model="pickupDateTime"
                                      required />
                    </v-flex>

                    <v-flex xs4>
                        <v-select
                            :label="$t( 'carRental.dropoff' )"
                            required
                            autocomplete
                            :items="cities"
                            item-text="name"
                            item-value="id"
                            no-data="No results found"
                            cache-items
                            :search-input.sync="dropoffSearch"
                            v-model.number="dropoffPlace"
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
                                        <div v-if="data.item.country">{{ $tc( 'country.country', 0 ) }}: {{ data.item.country.name }}</div>
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                            </template>
                        </v-select>
                        <v-text-field :label="$t( 'carRental.dropoffDate' )" type="datetime-local"
                                      v-model="dropoffDateTime"
                                      required min="1"/>
                    </v-flex>

                    <v-flex xs4>
                        <v-text-field :label="$t( 'carRental.driverAge' )" type="number" required min="18" v-model="driverAge" />
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-btn flat color="primary">
                <v-icon>search</v-icon>
                {{ $t( 'carRental.search' ) }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
    	data()
        {
    		return {
    			pickupSearch: null,
    	        dropoffSearch: null,
            }
        },

    	computed: {
    		cities()
            {
                return Object.values( this.$store.getters.citySearch );
            },

            pickupPlace: {
            	get()
                {
                	return this.$store.getters.carPickupPlace;
                },
                set( place )
                {
                	this.$store.commit( 'carPickupPlace', place );
                }
            },

            pickupDateTime: {
            	get()
                {
                	return this.$store.getters.carPickupDateTime;
                },
                set( dateTime )
                {
                	this.$store.commit( 'carPickupDateTime', dateTime );
                }
            },

            dropoffPlace: {
            	get()
                {
                	return this.$store.getters.carDropoffPlace;
                },
                set( place )
                {
                	this.$store.commit( 'carDropoffPlace', place );
                }
            },

            dropoffDateTime: {
            	get()
                {
                	return this.$store.getters.carDropoffDateTime;
                },
                set( dateTime )
                {
                	this.$store.commit( 'carDropoffDateTime', dateTime );
                }
            },

            driverAge: {
            	get()
                {
                	return this.$store.getters.carDriverAge;
                },
                set( age )
                {
                	this.$store.commit( 'carDriverAge', age );
                }
            }
        },

        methods: {
    	    searchCity( value ) {
                if( value && value.length >= 3 ) {
                	this.$store.dispatch( 'citySearch', value );
                }
            }
        },

        watch: {
    		pickupSearch( value )
            {
    		    this.searchCity( value );
            },

            dropoffSearch( value )
            {
            	this.searchCity( value );
            }
        }
    }
</script>