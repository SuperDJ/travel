<template>
    <form @submit.prevent="submit( form )">
        <v-text-field
            label="City name"
            v-model="form.name"
            required
            :error-messages="errors['name']"
        />

        <v-text-field
            label="City ISO code"
            v-model="form.iso"
            required
            minlength="4"
            maxlength="4"
            :error-messages="errors['iso']"
        />

        <v-text-field
            label="City IATA code"
            v-model="form.iata"
            required
            minlength="3"
            maxlength="3"
            :error-messages="errors['iata']"
        />

        <v-text-field
            label="City location latitude"
            v-model="form.latitude"
            :error-messages="errors['latitude']"
        />

        <v-text-field
            label="City location longitude"
            v-model="form.longitude"
            :error-messages="errors['longitude']"
        />

        <v-select
            label="Country"
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

        <v-switch label="Country capital" v-model="form.capital" :error-messages="errors['capital']" />

        <v-btn color="primary" type="submit">
            <v-icon>save</v-icon>
            Save city
        </v-btn>

        <v-btn flat :to="{ name: 'dashboardCity' }">
            <v-icon>arrow_back</v-icon>
            Back
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
                    iso: '',
                    iata: '',
                    capital: false,
                    latitude: '',
                    longitude: '',
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
                    iso: data.iso.toUpperCase(),
                    iata: data.iata.toUpperCase(),
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