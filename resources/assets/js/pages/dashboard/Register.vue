<template>
    <v-card>
        <v-card-title primary-title class="headline white--text primary">Register</v-card-title>
        <form  @submit.prevent="submit( form )">
            <v-card-text>
                <v-alert :type="success ? 'success' : 'error'" :value="message && message.length > 1">
                    {{ message }}
                </v-alert>

                <v-text-field
                    label="Email address"
                    type="email"
                    autocomplete="email"
                    required
                    :error-messages="errors['email']"
                    v-model="form.email"
                />

                <v-text-field
                    label="First name"
                    autocomplete="given-name"
                    required
                    :error-messages="errors['first_name']"
                    v-model="form.first_name"
                />

                <v-text-field
                    label="Last name"
                    autocomplete="family-name"
                    required
                    :error-messages="errors['last_name']"
                    v-model="form.last_name"
                />

                <v-select
                    label="Country"
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
                    label="Language"
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
                    label="Currency"
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
                    label="Password"
                    hint="At least 8 characters"
                    minlength="8"
                    :append-icon="passwordVisible ? 'visibility_off' : 'visibility'"
                    :append-icon-cb="() => (passwordVisible = !passwordVisible)"
                    :type="passwordVisible ? 'text' : 'password'"
                    required
                    counter
                    :error-messages="errors['password']"
                    v-model="form.password"
                />

                <v-text-field
                    label="Password repeat"
                    hint="At least 8 characters and must match password"
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
                <v-btn color="primary" type="submit">Register</v-btn>

                <v-btn flat color="primary" :to="{ name: 'Login' }">Login</v-btn>

                <v-btn flat color="primary" :to="{ name: 'Index' }">Back to website</v-btn>
            </v-card-actions>
        </form>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default
    {
		metaInfo: {
			title: 'Register'
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
            ...mapGetters([
                'message',
                'success',
                'errors'
            ]),
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