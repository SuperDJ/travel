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
		metaInfo()
		{
			return {
				title: this.$i18n.t( 'currency.edit' )
			}
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