<template>
    <form @submit.prevent="submit( form )">
        <v-card-text>
            <v-text-field
                :label="$t( 'user.email' )"
                required
                :error-messages="errors['email']"
                v-model="form.email"
            />

            <v-text-field
                :label="$t( 'user.password' )"
                :hint="$t( 'user.passwordCharacters' )"
                minlength="8"
                :append-icon="passwordVisible ? 'visibility_off' : 'visibility'"
                :append-icon-cb="() => (passwordVisible = !passwordVisible)"
                :type="passwordVisible ? 'text' : 'password'"
                required
                counter
                :error-messages="errors['password']"
                v-model="form.password"
            />
        </v-card-text>

        <v-card-actions>
            <v-btn type="submit" color="primary">{{ $t( 'user.login' ) }}</v-btn>

            <v-btn flat color="primary" :to="{name: 'register'}">{{ $t( 'user.register' ) }}</v-btn>

            <v-btn flat color="primary" :to="{name: 'index'}">{{ $t( 'toSite' ) }}</v-btn>
        </v-card-actions>
    </form>
</template>

<script>
    export default
    {
		metaInfo()
        {
        	return {
				title: this.$i18n.t( 'user.login' )
			}
		},

        data()
        {
        	return {
        	    form: {
        	    	email: '',
                    password: '',
                },
                passwordVisible: false,
            }
        },

        computed: {
			errors()
            {
            	return this.$store.getters.errors;
            }
        },

        methods: {
        	submit( data )
            {
                this.$store.dispatch( 'userLogin', data ).then(() => {
					this.form.password = '';

					// Make sure the user is logged in before
					if( sessionStorage.getItem( 'token' ) && sessionStorage.getItem( 'token' ).length > 0 )
					{
						this.$router.push( { name: 'dashboard' } );
					}
                });
            }
        },
    }
</script>