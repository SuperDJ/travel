<template>
    <v-container grid-list-md fluid>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card hover to="#">
                    <v-card-media height="500px"
                                  src="https://images.pexels.com/photos/604444/pexels-photo-604444.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb">
                        <v-container fill-height fluid justify-end>
                            <v-layout row bottom>
                                <v-flex class="subheader white--text" xs12 flexbox style="text-align:right">
                                    France
                                </v-flex>

                                <v-flex class="headline white--text" justify-end xs12 flexbox style="text-align:right">
                                    Paris
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-media>
                </v-card>
            </v-flex>

            <v-flex xs3>
                <v-card hover to="#">
                    <v-card-media height="300px" src="https://images.pexels.com/photos/347254/pexels-photo-347254.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb">
                        <v-container fill-height fluid>
                            <v-layout row bottom>
                                <v-flex class="subheader white--text" xs12 flexbox style="text-align:right">
                                    Netherlands
                                </v-flex>

                                <v-flex class="headline white--text" xs12 flexbox style="text-align:right">
                                    Amsterdam
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-media>
                </v-card>
            </v-flex>

            <v-flex xs3>
                <v-card hover to="#">
                    <v-card-media height="300px" src="https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb">
                        <v-container fill-height fluid>
                            <v-layout row bottom>
                                <v-flex class="subheader white--text" xs12 flexbox style="text-align:right">
                                    England
                                </v-flex>

                                <v-flex class="headline white--text" xs12 flexbox style="text-align:right">
                                    London
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-media>
                </v-card>
            </v-flex>

            <v-flex xs3>
                <v-card hover to="#">
                    <v-card-media height="300px" src="https://images.pexels.com/photos/109630/pexels-photo-109630.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb">
                        <v-container fill-height fluid>
                            <v-layout row bottom>
                                <v-flex class="subheader white--text" xs12 flexbox style="text-align:right">
                                    Berlin
                                </v-flex>

                                <v-flex class="headline white--text" xs12 flexbox style="text-align:right">
                                    Germany
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-media>
                </v-card>
            </v-flex>

            <v-flex xs3>
                <v-card hover to="#">
                    <v-card-media height="300px" src="https://images.pexels.com/photos/788352/pexels-photo-788352.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb">
                        <v-container fill-height fluid>
                            <v-layout row bottom>
                                <v-flex class="subheader white--text" xs12 flexbox style="text-align:right">
                                    Warsaw
                                </v-flex>

                                <v-flex class="headline white--text" xs12 flexbox style="text-align:right">
                                    Poland
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-media>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
    	props: {
    		destination: {
    			type: Number,
                required: true
            }
        },
        data() {
    		return {
    			data: {}
            }
        },

        methods: {
    		getData() {
    		    fetch(`/api/continent/${this.destination}/top-destinations`)
                    .then(response => {return response.json()})
                    .then(response => {this.data = response});
            }
        },

        mounted() {
    	    this.getData();
        }
    }
</script>