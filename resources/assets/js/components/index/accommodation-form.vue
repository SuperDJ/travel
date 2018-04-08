<template>
    <v-card hover>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout row wrap>
                    <v-flex xs4>
                        <v-select
                            :label="$t( 'accommodation.destination' )"
                            required
                            autocomplete
                            :items="cities"
                            item-text="name"
                            item-value="id"
                            no-data="No results found"
                            cache-items
                            :search-input.sync="citySearch"
                            v-model="city"
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
                    </v-flex>

                    <v-flex xs4>
                        <v-text-field :label="$t( 'accommodation.checkInDate' )" type="date" v-model="checkinDate"
                                      required />
                        <v-text-field :label="$t( 'accommodation.checkOutDate' )" type="date" v-model="checkoutDate"
                                      required />
                    </v-flex>

                    <v-flex xs4>
                        <v-text-field :label="$t( 'accommodation.numberOfPersons' )" type="number" v-model="persons"
                                      required min="1"/>
                        <v-text-field :label="$t( 'accommodation.numberOfRooms' )" type="number" v-model="rooms"
                                      required min="1"/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-btn flat color="primary">
                <v-icon>search</v-icon>
                {{ $t( 'accommodation.search' ) }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
    	data()
        {
        	return {
        		citySearch: null,
            }
        },
    	computed: {
    		cities() {
    		    return Object.values( this.$store.getters.citySearch );
            },

            city: {
            	get()
                {
                	return this.$store.getters.accommodationCity;
                },
                set( city )
                {
                	this.$store.commit( 'accommodationCity', city );
                }
            },

            checkinDate: {
            	get()
                {
                	return this.$store.getters.accommodationCheckinDate;
                },
                set( date )
                {
                	this.$store.commit( 'acccommodationCheckinDate', date );
                }
            },

            checkoutDate: {
            	get()
                {
                	return this.$store.getters.accommodationCheckoutDate;
                },
                set( date ) {
            		this.$store.commit( 'accommodationCheckoutDate', date );
                }
            },

            persons: {
    			get()
                {
                	return this.$store.getters.accommodationPersons;
                },
                get( persons )
                {
                    this.$store.commit( 'accommodationPersons', persons );
                }
            },

            rooms: {
    			get()
                {
                    return this.$store.getters.accommodationRooms;
                },
                set( rooms ) {
                    this.$store.commit( 'accommodationRooms', rooms );
                }
            }
        },

        watch: {
    		citySearch( value )
            {
            	if( value && value.length >= 3 )
				{
					this.$store.dispatch( 'citySearch', value );
				}
            }
        }
    }
</script>