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
			title: 'Edit group'
		},

        props: ['group'],

		components: {
			'c-form': () => import('./form')
		},

        computed: {
			form() {
				return this.$store.getters.groupEdit;
            }
        },

		methods: {
			submit( data )
			{
				this.$store.dispatch( 'groupUpdate', { id: this.group, details: data } );
			},
		},

        created()
        {
        	this.$store.dispatch( 'groupEdit', this.group );
        }
	}
</script>