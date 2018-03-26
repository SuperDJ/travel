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
			title: 'Edit airline'
		},

        props: ['airline'],

		components: {
			'c-form': () => import('./form')
		},

        computed: {
			form() {
				return this.$store.getters.airlineEdit;
            }
        },

		methods: {
			submit( data )
			{
				this.$store.dispatch( 'airlineUpdate', { id: this.airline, details: data } );
			},
		},

        created()
        {
        	this.$store.dispatch( 'airlineEdit', this.airline );
        }
	}
</script>