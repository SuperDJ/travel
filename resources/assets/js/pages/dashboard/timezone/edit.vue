<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 md6>
                <c-form @submitted="submit" :details="form" />
                <v-btn flat :to="{ name: 'dashboardTimezone' }">
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
			title: 'Edit timezone'
		},

        props: ['timezone'],

		components: {
			'c-form': () => import('./form')
		},

        computed: {
			form() {
				return this.$store.getters.timezoneEdit;
            }
        },

		methods: {
			submit( data )
			{
				this.$store.dispatch( 'timezoneUpdate', { id: this.timezone, details: data } );
			},
		},

        created()
        {
        	this.$store.dispatch( 'timezoneEdit', this.timezone );
        }
	}
</script>