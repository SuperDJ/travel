<template>
    <v-container fluid>
        <v-parallax :src="image" height="700">
            <v-layout column align-center justify-center>
                <v-card hover>
                    <v-tabs icons-and-text centered color="primary" slider-color="white" dark card>
                        <v-tab @click="changeForm('AccommodationForm')">
                            Accomodatie
                            <v-icon>hotel</v-icon>
                        </v-tab>
                        <v-tab @click="changeForm('FlightForm')">
                            Vliegtickets
                            <v-icon>flight</v-icon>
                        </v-tab>
                        <v-tab @click="changeForm('CarForm')">
                            Huurauto
                            <v-icon>directions_car</v-icon>
                        </v-tab>
                    </v-tabs>

                    <v-card-text>
                        <component :is="form"></component>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn flat color="primary"><v-icon>search</v-icon>Search</v-btn>
                    </v-card-actions>
                </v-card>
            </v-layout>
        </v-parallax>

        <v-layout row wrap tag="section" style="margin-top: 40px">
                <v-flex xs6 style="margin-bottom: 20px">
                    <h2 class="display-3">
                        <v-icon large>pin_drop</v-icon>
                        Populaire bestemmingen
                    </h2>
                </v-flex>

                <v-flex xs6 align-end>
                    <v-btn flat v-for="continent in continents" :key="continent.latitude" color="primary" @click="topDestinations(continent.id)">
                        {{continent.name}}
                    </v-btn>
                </v-flex>

            <v-flex xs12>
                <Destination :destination="topDestination"/>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12 s6>
                <h2 class="display-2">Recente verhalen</h2>
            </v-flex>

            <v-flex xs12 s6>
                <h2 class="display-2">Recente routes</h2>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import FlightForm from '@/components/index/flight-form';
    import AccommodationForm from '@/components/index/accommodation-form';
    import CarForm from '@/components/index/car-form';
    import Destination from '@/components/index/destination';

    export default {
    	data() {
    	    return {
    	    	continents: {},
                form: 'AccommodationForm',
                image: 'https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb',
                topDestination: 1,
            }
        },

        components: {
    		FlightForm,
            AccommodationForm,
            CarForm,
            Destination
        },

        methods: {
    		getContinents() {
                fetch('/api/continents')
                    .then(response => {return response.json()})
                    .then(response => {this.continents = response});
            },

            changeForm( type ) {
                this.form = type;
                console.log(this.form);

                let img = '';
                switch(type) {
                    case 'FlightForm':
                    	img = 'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb';
                    	break;
                    case 'AccommodationForm':
                    	img = 'https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb';
                    	break;
                    case 'CarForm':
                    	img = 'https://images.pexels.com/photos/708764/pexels-photo-708764.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb';
                    	break;
                }

                this.image = img;
            },

            topDestinations( id ) {

            }
        },

        mounted() {
    		this.getContinents();
        }
    }
</script>