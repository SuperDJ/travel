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
				title: this.$i18n.t( 'role.edit' )
			}
		},

        props: ['role'],

		components: {
			'c-form': () => import('./form')
		},

        computed: {
			form() {
				return this.$store.getters.roleEdit;
            }
        },

		methods: {
			submit( data )
			{
				this.$store.dispatch( 'roleUpdate', { id: this.role, details: data } );
			},
		},

        created()
        {
        	this.$store.dispatch( 'roleEdit', this.role );
        }
	}
</script>