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
			title: 'Edit continent'
		},

        props: ['continent'],

		components: {
			'c-form': () => import('./form')
		},

        computed: {
			form() {
				return this.$store.getters.continentEdit;
            }
        },

		methods: {
			submit( data )
			{
				this.$store.dispatch( 'continentUpdate', { id: this.continent, details: data } );
			},
		},

        created()
        {
        	this.$store.dispatch( 'continentEdit', this.continent );
        }
	}
</script>