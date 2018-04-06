<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 md6>
                <c-form @submitted="submit" />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
		metaInfo()
		{
			return {
				title: this.$i18n.t( 'language.create' )
			}
		},

    	components: {
    		'c-form': () => import('./form')
        },

        methods: {
    		submit( data )
            {
                this.$store.dispatch( 'languageStore', data );
            }
        }
    }
</script>