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
			title: 'Edit permission'
		},

        props: ['permission'],

		components: {
			'c-form': () => import('./form')
		},

        computed: {
			form() {
				return this.$store.getters.permissionEdit;
            }
        },

		methods: {
			submit( data )
			{
				this.$store.dispatch( 'permissionUpdate', { id: this.permission, details: data } );
			},
		},

        created()
        {
        	this.$store.dispatch( 'permissionEdit', this.permission );
        }
	}
</script>