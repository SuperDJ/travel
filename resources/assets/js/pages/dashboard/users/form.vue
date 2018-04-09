<template>
    <form @submit.prevent="submit( form )">
        <v-text-field
            :label="$t( 'user.firstName' )"
            v-model="form.first_name"
            :disabled="!me"
            readonly
        />

        <v-text-field
            :label="$t( 'user.lastName' )"
            v-model="form.last_name"
            :disabled="!me"
            readonly
        />

        <v-text-field
            :label="$t( 'user.email' )"
            v-model="form.email"
            :disabled="!me"
            readonly
        />

        <v-select
            :label="$tc( 'role.role', 1 )"
            v-model="form.roles"
            autocomplete
            :items="roles"
            item-text="name"
            item-value="id"
            no-data="No roles found"
            cache-items
            required
            multiple
            chips
            :error-messages="errors['roles']"
            :search-input.sync="roleSearch"
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
            :disabled="!me"
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
            :disabled="!me"
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
            :disabled="!me"
            :error-messages="errors['currency_id']"
            :search-input.sync="currencySearch"
        />

        <v-select
            :label="$tc( 'timezone.timezone', 0 )"
            v-model.number="form.timezone_id"
            autocomplete
            :items="timezones"
            item-text="name"
            item-value="id"
            no-data="No timezone found"
            cache-items
            :disabled="!me"
            :error-messages="errors['timezone_id']"
            :search-input.sync="timezoneSearch"
        />

        <v-btn color="primary" type="submit">
            <v-icon>save</v-icon>
            {{ $t( 'user.save' ) }}
        </v-btn>

        <v-btn flat :to="{ name: 'userIndex' }">
            <v-icon>arrow_back</v-icon>
            {{ $tc( 'back', 0) }}
        </v-btn>
    </form>
</template>

<script>
    export default
    {
		props: {
			details: {
				type: Object,
				required: false,
				default: null
			},
            user: {
				type: Number,
                required: false,
                default: null
            }
		},

		data()
		{
			return {
				form: {
					first_name: '',
                    last_name: '',
                    email: '',
					language_id: 0,
					country_id: 0,
					currency_id: 0,
                    timezone_id: 0,
					roles: []
				},
				languageSearch: null,
				countrySearch: null,
				currencySearch: null,
				roleSearch: null,
                timezoneSearch: null,
			}
		},

		computed: {
			errors()
			{
				return this.$store.getters.errors;
			},

			roles()
			{
				return Object.values( this.$store.getters.roleSearch );
			},

			languages()
			{
				return Object.values( this.$store.getters.languageSearch );
			},

			countries()
			{
				return Object.values( this.$store.getters.countrySearch );
			},

			currencies()
			{
				return Object.values( this.$store.getters.currencySearch );
			},

            timezones()
            {
                return Object.values( this.$store.getters.timezoneSearch );
            }
		},

		methods: {
			submit( data )
            {
				this.$emit( 'submitted', data );
			},

            me()
            {
            	if( this.user === this.$store.getters.userProfile.id )
                {
                	return true;
                } else {
            		return false;
                }
            }
		},

		watch: {
			details( after )
			{
				console.log(after);
				this.form = after;

				if( after.roles )
                {
                	for( let i = 0; i < after.roles.length; i++ )
                    {
						this.$store.dispatch( 'roleSearch', after.roles[i].id );
                    }
                }

                if( after.language_id ) { this.$store.dispatch( 'languageSearch', after.language_id ); }

                if( after.timezone_id ) { this.$store.dispatch( 'timezoneSearch', after.timezone_id ); }

                if( after.country_id ) { this.$store.dispatch( 'countrySearch', after.country_id ); }

                if( after.currency_id ) { this.$store.dispatch( 'currencySearch', after.currency_id ); }
			},

			roleSearch( role )
			{
				if( role && role.length >= 2 )
				{
					this.$store.dispatch( 'roleSearch', role );
				}
			},

			languageSearch( language )
			{
				if( language && language.length >= 2 )
				{
					this.$store.dispatch( 'languageSearch', language );
				}
			},

			countrySearch( country )
			{
				if( country && country.length >= 2 )
				{
					this.$store.dispatch( 'countrySearch', country );
				}
			},

			currencySearch( currency )
			{
				if( currency && currency.length >= 2 )
				{
					this.$store.dispatch( 'currencySearch', currency );
				}
			},

			timezoneSearch( timezone )
			{
				if( timezone && timezone.length >= 2 )
				{
					this.$store.dispatch( 'timezoneSearch', timezone );
				}
			},
		},
    }
</script>