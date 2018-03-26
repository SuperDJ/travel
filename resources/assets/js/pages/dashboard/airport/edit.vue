<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 md6>
                <c-form @submitted="submit" :details="form" />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
	export default {
		metaInfo: {
			title: 'Edit airport'
		},

        props: ['airport'],

		components: {
			'c-form': () => import('./form')
		},

        computed: {
			form() {
				return this.$store.getters.airportEdit;
            }
        },

		methods: {
			submit( data )
			{
				this.$store.dispatch( 'airportUpdate', { id: this.airport, details: data } );
			},
		},

        created()
        {
        	this.$store.dispatch( 'airportEdit', this.airport );
        }
	}
</script>