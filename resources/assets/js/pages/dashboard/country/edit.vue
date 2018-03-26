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
			title: 'Edit country'
		},

        props: ['country'],

		components: {
			'c-form': () => import('./form')
		},

        computed: {
			form() {
				return this.$store.getters.countryEdit;
            }
        },

		methods: {
			submit( data )
			{
				this.$store.dispatch( 'countryUpdate', { id: this.country, details: data } );
			},
		},

        created()
        {
        	this.$store.dispatch( 'countryEdit', this.country );
        }
	}
</script>