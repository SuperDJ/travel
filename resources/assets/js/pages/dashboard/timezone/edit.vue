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
				title: this.$i18n.t( 'timezone.edit' )
			}
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