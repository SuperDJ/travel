<template>
    <v-container fluid>
        <v-parallax :src="image" height="700">
            <v-layout column align-center justify-center>
                <v-tabs icons-and-text centered color="primary" slider-color="white" dark card>
                    <v-tab href="#accommodation" @click="changeForm('accommodation')">
                        {{ $tc( 'accommodation.accommodation', 1 ) }}
                        <v-icon>hotel</v-icon>
                    </v-tab>
                    <v-tab href="#flight" @click="changeForm('flight')">
                        {{ $tc( 'flight.flight', 1 ) }}
                        <v-icon>flight</v-icon>
                    </v-tab>
                    <v-tab href="#car" @click="changeForm('car')">
                        {{ $tc( 'carRental.carRental', 1 ) }}
                        <v-icon>directions_car</v-icon>
                    </v-tab>

                    <v-tabs-items>
                        <v-tab-item id="accommodation">
                            <AccommodationForm />
                        </v-tab-item>
                        <v-tab-item id="flight">
                            <FlightForm />
                        </v-tab-item>
                        <v-tab-item id="car">
                            <CarForm />
                        </v-tab-item>
                    </v-tabs-items>
                </v-tabs>
            </v-layout>
        </v-parallax>

        <v-layout row wrap tag="section" style="margin-top: 40px">
                <v-flex xs12 style="margin-bottom: 20px">
                    <h2 class="display-3 text-xs-center">
                        <v-icon large>pin_drop</v-icon>
                        Top destinations
                    </h2>
                </v-flex>

                <v-flex xs12>
                    <v-tabs centered color="transparent">
                        <v-tab v-for="continent in continents" :key="`continent-${continent.id}`" :href="`#continent-${continent.name}`">
                            {{continent.name}}</v-tab>

                        <v-tabs-items>
                            <v-tab-item v-for="continent in continents" :key="continent.name" :id="`continent-${continent.name}`">
                                <Destination :destination="continent.id" />
                            </v-tab-item>
                        </v-tabs-items>
                    </v-tabs>
                </v-flex>
        </v-layout>

        <v-layout row wrap tag="section" style="margin-top: 40px">
            <v-flex xs12 style="margin-bottom: 20px">
                <h2 class="display-3 text-xs-center">
                    <v-icon large>pool</v-icon>
                    Activities
                </h2>
            </v-flex>

            <v-flex xs12>
                <v-tabs centered color="transparent">
                    <v-tab>Winter</v-tab>
                    <v-tab>Summer</v-tab>
                    <v-tab>Spring</v-tab>
                    <v-tab>Autumn</v-tab>

                    <v-tab-item>
                        <Activity :activity="activity"/>
                    </v-tab-item>
                </v-tabs>
                <Activity :activity="activity"/>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12 sm6 tag="section">
                <h2 class="display-2 text-xs-center"><v-icon x-large>edit</v-icon> Recent stories</h2>
            </v-flex>

            <v-flex xs12 sm6 tag="section">
                <h2 class="display-2 text-xs-center"><v-icon x-large>directions</v-icon> Recent routes</h2>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default
    {
		metaInfo: {
			title: 'Home'
		},

    	data()
        {
    	    return {
                image: 'https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb',
                activity: 1,
            }
        },

        computed: {
    	    continents()
            {
    	    	return this.$store.getters.continentIndex;
            },
        },

        components: {
    		FlightForm: () => import( '@/components/index/flight-form' ),
            AccommodationForm: () => import( '@/components/index/accommodation-form' ),
            CarForm: () => import( '@/components/index/car-form' ),
            Destination: () => import( '@/components/index/destination' ),
            Activity: () => import( '@/components/index/activity' ),
        },

        methods: {
    		getContinents()
            {
				this.$store.dispatch('continentIndex');
			},

            changeForm( type )
            {
                let img = '';
                switch( type )
                {
                    case 'flight':
                    	img = 'https://images.pexels.com/photos/219014/pexels-photo-219014.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb';
                    	break;
                    case 'accommodation':
                    	img = 'https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb';
                    	break;
                    case 'car':
                    	img = 'https://images.pexels.com/photos/21014/pexels-photo.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb';
                    	break;
                }

                this.image = img;
            },
        },

        created() {
    		this.getContinents();
        }
    }
</script>