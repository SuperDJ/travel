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
			title: 'Edit city'
		},

        props: ['city'],

		components: {
			'c-form': () => import('./form')
		},

        computed: {
			form() {
				return this.$store.getters.cityEdit;
            }
        },

		methods: {
			submit( data )
			{
				this.$store.dispatch( 'cityUpdate', { id: this.city, details: data } );
			},
		},

        created()
        {
        	this.$store.dispatch( 'cityEdit', this.city );
        }
	}
</script>