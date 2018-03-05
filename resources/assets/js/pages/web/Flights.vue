<template>
    <v-container fluid>
        <v-parallax src="https://images.pexels.com/photos/219014/pexels-photo-219014.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb" height="700">
            <v-layout column align-center justify-center>
                <FlightsForm
                    :departure="departure"
                    :departureDate="departureDate"
                    :destination="destination"
                    :destinationDate="destinationDate"
                    :adults="parseInt(adults)"
                    :children="parseInt(children)"
                    :infants="parseInt(infants)"
                    :cabinClass="cabinClass"
                />
            </v-layout>
        </v-parallax>

        <v-layout row wrap>
            <div v-for="flight in flights" :key="i"></div>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
		metaInfo: {
			title: 'Flights'
		},

        components: {
        	FlightsForm: () => import('@/components/index/flight-form'),
        },

        computed: {
		    flights() {
                return this.$store.getters.browseQuotes;
            }
        },

        props: [
        	'departure',
            'departureDate',
            'destination',
            'destinationDate',
            'adults',
            'children',
            'infants',
            'cabinClass'
        ],

        methods: {
			searchFlight()
            {
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
                }

                this.$store.dispatch( 'browseQuotes', data );
            }
        },

        created() {
			this.searchFlight();
        }
    }
</script>