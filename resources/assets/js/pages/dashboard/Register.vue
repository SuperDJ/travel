<template>
    <form @submit.prevent="submit( form )">
        <v-card-text>
            <v-text-field
                :label="$t( 'user.email' )"
                type="email"
                autocomplete="email"
                required
                :error-messages="errors['email']"
                v-model="form.email"
            />

            <v-text-field
                :label="$t( 'user.firstName' )"
                autocomplete="given-name"
                required
                :error-messages="errors['first_name']"
                v-model="form.first_name"
            />

            <v-text-field
                :label="$t( 'user.lastName' )"
                autocomplete="family-name"
                required
                :error-messages="errors['last_name']"
                v-model="form.last_name"
            />

            <v-select
                :label="$tc( 'country.country', 0 )"
                v-model.number="form.country_id"
                autocomplete
                :items="countries"
                item-text="name"
                item-value="id"
                no-data="No countries found"
                cache-items
                :error-messages="errors['country_id']"
                :search-input.sync="countrySearch"
            />

            <v-select
                :label="$tc( 'language.language', 0 )"
                v-model.number="form.language_id"
                autocomplete
                :items="languages"
                item-text="name"
                item-value="id"
                no-data="No languages found"
                cache-items
                :error-messages="errors['language_id']"
                :search-input.sync="languageSearch"
            />

            <v-select
                :label="$tc( 'currency.currency', 0 )"
                v-model.number="form.currency_id"
                autocomplete
                :items="currencies"
                item-text="name"
                item-value="id"
                no-data="No currency found"
                cache-items
                :error-messages="errors['currency_id']"
                :search-input.sync="currencySearch"
            />

            <v-text-field
                :label="$t( 'user.password' )"
                :hint="$t( 'user.passwordCharacters' )"
                minlength="8"
                :append-icon="passwordVisible ? 'visibility_off' : 'visibility'"
                :append-icon-cb="() => ( passwordVisible = !passwordVisible )"
                :type="passwordVisible ? 'text' : 'password'"
                required
                counter
                :error-messages="errors['password']"
                v-model="form.password"
            />

            <v-text-field
                :label="$t( 'user.passwordRepeat' )"
                :hint="$t( 'user.passwordMatch' )"
                minlength="8"
                :append-icon="passwordRepeatVisible ? 'visibility_off' : 'visibility'"
                :append-icon-cb="() => (passwordRepeatVisible = !passwordRepeatVisible)"
                :type="passwordRepeatVisible ? 'text' : 'password'"
                required
                counter
                :error-messages="errors['passwordRepeat']"
                v-model="form.passwordRepeat"
            />
        </v-card-text>

        <v-card-actions>
            <v-btn color="primary" type="submit">{{ $t( 'user.register' ) }}</v-btn>

            <v-btn flat color="primary" :to="{ name: 'login' }">{{ $t( 'user.login' ) }}</v-btn>

            <v-btn flat color="primary" :to="{ name: 'index' }">{{ $t( 'toSite' ) }}</v-btn>
        </v-card-actions>
    </form>
</template>

<script>
    export default
    {
		metaInfo()
        {
        	return {
				title: this.$i18n.t( 'user.register' )
			}
		},

    	data()
        {
            return {
            	form: {
					first_name: '',
					last_name: '',
					passwordRepeat: '',
					currency_id: 0,
					country_id: 0,
					language_id: 0,
                    password: '',
                    email: ''
                },
                passwordVisible: false,
                passwordRepeatVisible: false,
                currencySearch: null,
                countrySearch: null,
                languageSearch: null,
            }
        },

    	computed: {
			countries()
            {
			    return Object.values( this.$store.getters.countrySearch );
            },

			languages()
            {
				return Object.values( this.$store.getters.languageSearch );
			},

			currencies()
            {
				return Object.values( this.$store.getters.currencySearch );
			},

            errors()
            {
            	return this.$store.getters.errors;
            },
        },

        methods: {
			/**
             * Submit the form
             */
			submit( data )
            {
            	this.$store.dispatch( 'userRegister', data );

            	this.form.password = '';
            	this.form.passwordRepeat = '';
            },
        },

        watch: {
			/**
             * Search countries
             *
			 * @param country
			 */
			countrySearch( country )
            {
            	if( country && country.length > 2 )
                {
                	this.$store.dispatch( 'countrySearch', country );
                }
            },

			/**
             * Search languages
             *
			 * @param language
			 */
			languageSearch( language )
			{
				if( language && language.length > 2 )
				{
					this.$store.dispatch( 'languageSearch', language );
				}
			},

			/**
             * Search currencies
             *
			 * @param currency
			 */
			currencySearch( currency )
			{
				if( currency && currency.length > 2 )
				{
					this.$store.dispatch( 'currencySearch', currency );
				}
			}
        },
    }
</script>