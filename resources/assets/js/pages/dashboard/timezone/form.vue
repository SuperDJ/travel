<template>
    <form @submit.prevent="submit( form )">
        <v-text-field
            :label="$tc( 'timezone.timezone', 0 )"
            v-model="form.name"
            required
            :error-messages="errors['name']"
        />

        <v-text-field
            :label="$t( 'timezone.gmt' )"
            v-model="form.gmt_offset"
            required
            :error-messages="errors['gmt_offset']"
        />

        <v-select
            :label="$tc( 'country.country', 0 )"
            v-model.number="form.country_id"
            autocomplete
            :items="countries"
            item-text="name"
            item-value="id"
            no-data="No country found"
            cache-items
            required
            :error-messages="errors['country_id']"
            :search-input.sync="countrySearch"
        />

        <v-btn color="primary" type="submit">
            <v-icon>save</v-icon>
            {{ $t( 'timezone.save' ) }}
        </v-btn>

        <v-btn flat href="http://php.net/manual/en/timezones.php" target="_blank">
            {{ $t( 'timezone.supported' ) }}
        </v-btn>

        <v-btn flat :to="{ name: 'timezoneIndex' }">
            <v-icon>arrow_back</v-icon>
            {{ $tc( 'back', 1 ) }}
        </v-btn>
    </form>
</template>

<script>
    export default {
    	props: {
    		details: {
    			type: Object,
                required: false,
                default: null
            }
        },

        data()
        {
        	return {
        		form: {
					name: '',
                    gmt_offset: '',
                    country_id: 0
				},
                countrySearch: null,
            }
        },

        computed: {
    	    errors()
            {
            	return this.$store.getters.errors;
            },

            countries()
            {
            	return Object.values( this.$store.getters.countrySearch );
            }
        },

        methods: {
    		submit( data ) {
    		    let details = {
    		    	name: data.name.charAt( 0 ).toUpperCase() + data.name.slice( 1 ),
                };

                this.$emit( 'submitted', Object.assign( data, details ) );
            }
        },

        watch: {
        	details( after )
            {
            	this.form = after;
            	this.$store.dispatch( 'countrySearch', after.country_id );
            },

            countrySearch( country )
            {
            	if( country && country.length >= 2 )
                {
                	this.$store.dispatch( 'countrySearch', country );
                }
            },
        }
    }
</script>