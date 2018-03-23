<template>
    <v-container grid-list-lg fluid>
        <v-layout row wrap>
            <v-flex xs9>
                <v-card
                    v-if="this.data[0]"
                    hover
                    height="616px"
                    to="#"
                    :img="image( 'horizontal', this.data[0].name, this.data[0].cities[0] )"
                >
                    <v-card-text class="fill-height px-0 py-0">
                        <v-jumbotron gradient="to top, rgba(33, 33, 33, 0.4) 15%, rgba(255, 255, 255, 0) 33%" height="100%">
                            <v-container fluid fill-height class="white--text text-xs-right">
                                <v-layout row wrap align-end align-content-end>
                                    <v-flex class="display-1" xs12>
                                        {{ this.data[0].name }}
                                    </v-flex>

                                    <v-flex class="display-3" xs12 v-if="this.data[0].cities[0]">
                                        {{ this.data[0].cities[0].name }}
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-jumbotron>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex xs3>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card
                            v-if="this.data[1]"
                            hover
                            to="#"
                            height="300px"
                            img="https://images.pexels.com/photos/347254/pexels-photo-347254.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
                        >
                            <v-card-text class="fill-height px-0 py-0">
                                <v-jumbotron gradient="to top, rgba(33, 33, 33, 0.4) 15%, rgba(255, 255, 255, 0) 33%" height="100%">
                                    <v-container fluid fill-height class="white--text text-xs-right">
                                        <v-layout row wrap align-end align-content-end>
                                            <v-flex xs12>
                                                {{ this.data[1].name }}
                                            </v-flex>

                                            <v-flex class="headline" xs12 v-if="this.data[1].cities[0]">
                                                {{ this.data[1].cities[0].name }}
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-jumbotron>
                            </v-card-text>
                        </v-card>
                    </v-flex>

                    <v-flex xs12>
                        <v-card
                            v-if="this.data[2]"
                            hover
                            to="#"
                            height="300px"
                            img="https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
                        >
                            <v-card-text class="fill-height px-0 py-0">
                                <v-jumbotron gradient="to top, rgba(33, 33, 33, 0.4) 15%, rgba(255, 255, 255, 0) 33%" height="100%">
                                    <v-container fluid fill-height class="white--text text-xs-right">
                                        <v-layout row wrap align-end align-content-end>
                                            <v-flex xs12>
                                                {{ this.data[2].name }}
                                            </v-flex>

                                            <v-flex class="headline" xs12 v-if="this.data[2].cities[0]">
                                                {{ this.data[2].cities[0].name }}
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-jumbotron>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs3>
                <v-card
                    v-if="this.data[3]"
                     hover
                    to="#"
                    height="300px"
                    img="https://images.pexels.com/photos/109630/pexels-photo-109630.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
                >
                    <v-card-text class="fill-height px-0 py-0">
                        <v-jumbotron gradient="to top, rgba(33, 33, 33, 0.4) 15%, rgba(255, 255, 255, 0) 33%" height="100%">
                            <v-container fluid fill-height class="white--text text-xs-right">
                                <v-layout row wrap align-end align-content-end>
                                    <v-flex xs12>
                                        {{ this.data[3].name }}
                                    </v-flex>

                                    <v-flex class="headline" xs12 v-if="this.data[3].cities[0]">
                                        {{ this.data[3].cities[0].name }}
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-jumbotron>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex xs3>
                <v-card
                    v-if="this.data[4]"
                    hover
                    to="#"
                    height="300px"
                    img="https://images.pexels.com/photos/788352/pexels-photo-788352.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
                >
                    <v-card-text class="fill-height px-0 py-0">
                        <v-jumbotron gradient="to top, rgba(33, 33, 33, 0.4) 15%, rgba(255, 255, 255, 0) 33%" height="100%">
                            <v-container fluid fill-height class="white--text text-xs-right">
                                <v-layout row wrap align-end align-content-end>
                                    <v-flex xs12 >
                                        {{ this.data[4].name }}
                                    </v-flex>

                                    <v-flex class="headline" xs12 v-if="this.data[4].cities[0]">
                                        {{ this.data[4].cities[0].name }}
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-jumbotron>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex xs3>
                <v-card
                    v-if="this.data[5]"
                    hover
                    to="#"
                    height="300px"
                    img="https://images.pexels.com/photos/126292/pexels-photo-126292.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
                >
                    <v-card-text class="fill-height px-0 py-0">
                        <v-jumbotron gradient="to top, rgba(33, 33, 33, 0.4) 15%, rgba(255, 255, 255, 0) 33%" height="100%">
                            <v-container fluid fill-height class="white--text text-xs-right">
                                <v-layout row wrap align-end align-content-end>
                                    <v-flex xs12>
                                        {{ this.data[5].name }}
                                    </v-flex>

                                    <v-flex class="headline" xs12 v-if="this.data[5].cities[0]">
                                        {{ this.data[5].cities[0].name }}
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-jumbotron>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex xs3>
                <v-card
                    v-if="this.data[6]"
                    hover
                    to="#"
                    height="300px"
                    img="https://images.pexels.com/photos/6502/city-capital-italy-historical.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb"
                >
                    <v-card-text class="fill-height px-0 py-0">
                        <v-jumbotron gradient="to top, rgba(33, 33, 33, 0.4) 15%, rgba(255, 255, 255, 0) 33%" height="100%">
                            <v-container fluid fill-height class="white--text text-xs-right">
                                <v-layout row wrap align-end align-content-end>
                                    <v-flex xs12>
                                        {{ this.data[6].name }}
                                    </v-flex>

                                    <v-flex class="headline" xs12 v-if="this.data[6].cities[0]">
                                        {{ this.data[6].cities[0].name }}
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-jumbotron>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default
    {
    	props: {
    		destination: {
    			type: Number,
                required: true
            }
        },
        data()
        {
    		return {
    			data: {}
            }
        },

        methods: {
    		getData()
            {
                return fetch( `/api/continents/${this.destination}/top-destinations` )
                    .then( response => response.json() )
                    .then( response => this.data = response )
                    .catch( error => console.error( error ) );
            },
            image( orientation, country, city )
            {
            	let search = country.replace( / /g, '+' );

            	if( city && city.length > 0 )
            	{
            		search += `+${city.replace( / /g, '+' ) }`;
                }

                const img = async () =>
				{
					const response = await fetch(
						`https://pixabay.com/api/?key=${window.pixabay}&q=${search}&image_type=photo&safesearch=true&orientation=${orientation}` );
					const json = await response.json();

					console.log(json);
					return json;
				};

            	return img;
            }
        },

        mounted()
        {
    	    this.getData();

    	    console.log(this.image('horizontal', 'netherlands', 'groningen').then(resp => resp));
        }
    }
</script>