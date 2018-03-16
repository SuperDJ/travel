<template>
    <v-card>
        <form  @keyup.enter="submit(form)" @submit.prevent="submit(form)">
            <v-card-text>
                <h1 class="display-4">Register</h1>

                <v-text-field label="Email address" type="email" autocomplete="email" required
                              v-model="form.email" />

                <v-text-field label="First name" autocomplete="given-name" required v-model="form.first_name" />

                <v-text-field label="Last name" autocomplete="family-name" required v-model="form.last_name" />

                <v-select
                    label="Country"
                    v-model.number="form.country"
                    autocomplete
                    :items="countries"
                    item-text="name"
                    item-value="id"
                    no-data="No countries found"
                    cache-items
                    :search-input.sync="countrySearch"
                />

                <v-select
                    label="Language"
                    v-model.number="form.language"
                    autocomplete
                    :items="languages"
                    item-text="name"
                    item-value="id"
                    no-data="No languages found"
                    cache-items
                    :search-input.sync="languageSearch"
                />

                <v-select
                    label="Currency"
                    v-model.number="form.currency"
                    autocomplete
                    :items="currencies"
                    item-text="name"
                    item-value="id"
                    no-data="No currency found"
                    cache-items
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
                    v-model="form.passwordRepeat"
                />
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary" type="submit">Register</v-btn>

                <v-btn flat color="primary" :to="{name: 'Login'}" type="button">Login</v-btn>

                <v-btn flat color="primary" :to="{name: 'Index'}" type="button">Back to website</v-btn>
            </v-card-actions>
        </form>
    </v-card>
</template>

<script>
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
					currency: 0,
					country: 0,
					language: 0,
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
        },

        methods: {
			/**
             * Submit the form
             */
			submit( data )
            {
            	// Base64 encode password
            	data.password = btoa( data.password );
            	data.passwordRepeat = btoa( data.passwordRepeat );

            	this.$store.dispatch( 'userRegister', data );
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
        }
    }
</script>