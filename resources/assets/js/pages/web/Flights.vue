<template>
    <v-container fluid>
        <v-parallax src="https://images.pexels.com/photos/219014/pexels-photo-219014.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb" height="700">
            <v-layout column align-center justify-center>
                <FlightsForm
                    :departure="departure"
                    :departureDate="departureDate"
                    :destination="destination"
                    :destinationDate="destinationDate"
                    :adults="adults"
                    :children="children"
                    :infants="infants"
                />
            </v-layout>
        </v-parallax>
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

        props:
            ['departure',
            'departureDate',
            'destination',
            'destinationDate',
             'adults',
            'children',
            'infants',
            'cabinClass']
    }
</script>