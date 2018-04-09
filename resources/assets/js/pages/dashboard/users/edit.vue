<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 md6>
                <c-form @submitted="submit" :details="form" :user="parseInt( this.user )" />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
	export default {
		metaInfo()
        {
        	return {
				title: this.$i18n.t( 'user.edit' )
			}
		},

		props: ['user'],

		components: {
			'c-form': () => import('./form')
		},

		computed: {
			form() {
				return this.$store.getters.userEdit;
			}
		},

		methods: {
			submit( data )
			{
				this.$store.dispatch( 'userUpdate', { id: this.user, details: data } );
			},
		},

		created()
		{
			this.$store.dispatch( 'userEdit', this.user );
		}
	}
</script>