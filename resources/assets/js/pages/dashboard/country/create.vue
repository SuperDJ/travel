<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 md6>
                <c-form @submitted="submit" />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
    	metaInfo: {
    		title: 'Create country'
        },

    	components: {
    		'c-form': () => import('./form')
        },

        methods: {
    		submit( data )
            {
                this.$store.dispatch( 'countryStore', data );
            }
        }
    }
</script>