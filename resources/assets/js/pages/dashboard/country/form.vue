<template>
    <form @submit.prevent="submit( form )">
        <v-text-field
            label="Country name"
            v-model="form.name"
            required
            :error-messages="errors['name']"
        />

        <v-text-field
            label="Country ISO code"
            v-model="form.iso"
            required
            minlength="2"
            maxlength="2"
            :error-messages="errors['iso']"
        />

        <v-select
            label="Continent"
            v-model.number="form.continent_id"
            autocomplete
            :items="continents"
            item-text="name"
            item-value="id"
            no-data="No continent found"
            cache-items
            required
            :error-messages="errors['continent_id']"
            :search-input.sync="continentSearch"
        />

        <v-select
            label="Language"
            v-model.number="form.language_id"
            autocomplete
            required
            :items="languages"
            item-text="name"
            item-value="id"
            no-data="No languages found"
            cache-items
            :error-messages="errors['language_id']"
            :search-input.sync="languageSearch"
        />

        <v-select
            label="Currency"
            v-model.number="form.currency_id"
            autocomplete
            :items="currencies"
            item-text="name"
            required
            item-value="id"
            no-data="No currency found"
            cache-items
            :error-messages="errors['currency_id']"
            :search-input.sync="currencySearch"
        />

        <v-btn color="primary" type="submit">
            <v-icon>save</v-icon>
            Save country
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
                    continent_id: null,
                    language_id: null,
                    currency_id: null,
				},
                continentSearch: null,
                languageSearch: null,
                currencySearch: null,
            }
        },

        computed: {
    	    errors()
            {
            	return this.$store.getters.errors;
            },

            continents()
            {
            	return Object.values( this.$store.getters.continentSearch );
            },

			languages()
			{
				return Object.values( this.$store.getters.languageSearch );
			},

			currencies()
			{
				return Object.values( this.$store.getters.currencySearch );
			}
        },

        methods: {
    		submit( data ) {
    		    let details = {
    		    	name: data.name.charAt( 0 ).toUpperCase() + data.name.slice( 1 ),
                    iso: data.iso.toUpperCase()
                };

                this.$emit( 'submitted', Object.assign( data, details ) );
            },

			continent( continent )
			{
				if( continent && continent.length >= 2 )
				{
					this.$store.dispatch( 'continentSearch', continent );
				}
			},

			currency( currency )
			{
				if( currency && currency.length >= 2 )
				{
					this.$store.dispatch( 'currencySearch', currency );
				}
			},

			language( language )
			{
				if( language && language.length >= 2 )
				{
					this.$store.dispatch( 'languageSearch', language );
				}
			},
        },

        watch: {
        	details( after )
            {
            	this.form = after;
				this.$store.dispatch( 'continentSearch', after.continent_id );
				this.$store.dispatch( 'languageSearch', after.language_id );
				this.$store.dispatch( 'currencySearch', after.currency_id );
            },

			continentSearch( continent )
			{
				this.continent( continent );
			},

			currencySearch( currency )
			{
				this.currency( currency );
			},

			languageSearch( language )
			{
				this.language( language );
			},
        },
    }
</script>