<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 md6>
                <c-form @submitted="submit" />
                <v-btn flat :to="{ name: 'dashboardAirline' }">
                    <v-icon>arrow_back</v-icon>
                    Back
                </v-btn>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
    export default {
    	metaInfo: {
    		title: 'Create airline'
        },

    	components: {
    		'c-form': () => import('./form')
        },

        methods: {
    		submit( data )
            {
                this.$store.dispatch( 'airlineStore', data );
            }
        }
    }
</script>