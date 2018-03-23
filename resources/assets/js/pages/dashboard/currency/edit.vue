<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 md6>
                <c-form @submitted="submit" :details="form" />
                <v-btn flat :to="{ name: 'dashboardCurrency' }">
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
			title: 'Edit currency'
		},

        props: ['currency'],

		components: {
			'c-form': () => import('./form')
		},

        computed: {
			form() {
				return this.$store.getters.currencyEdit;
            }
        },

		methods: {
			submit( data )
			{
				this.$store.dispatch( 'currencyUpdate', { id: this.currency, details: data } );
			},
		},

        created()
        {
        	this.$store.dispatch( 'currencyEdit', this.currency );
        }
	}
</script>