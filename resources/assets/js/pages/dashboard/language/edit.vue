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
				title: this.$i18n.t( 'language.edit' )
			}
		},

        props: ['language'],

		components: {
			'c-form': () => import('./form')
		},

        computed: {
			form() {
				return this.$store.getters.languageEdit;
            }
        },

		methods: {
			submit( data )
			{
				this.$store.dispatch( 'languageUpdate', { id: this.language, details: data } );
			},
		},

        created()
        {
        	this.$store.dispatch( 'languageEdit', this.language );
        }
	}
</script>