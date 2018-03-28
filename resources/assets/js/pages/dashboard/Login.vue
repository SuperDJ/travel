<template>
    <form @submit.prevent="submit( form )">
        <v-card-text>
            <v-text-field
                label="Email address"
                required
                :error-messages="errors['email']"
                v-model="form.email"
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
        </v-card-text>

        <v-card-actions>
            <v-btn type="submit" color="primary">Login</v-btn>

            <v-btn flat color="primary" :to="{name: 'register'}">Register</v-btn>

            <v-btn flat color="primary" :to="{name: 'index'}">Back to website</v-btn>
        </v-card-actions>
    </form>
</template>

<script>
    export default
    {
		metaInfo: {
			title: 'Login'
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
					if( sessionStorage.getItem( 'token' ) && sessionStorage.getItem( 'token' ).length > 0 ) {
						this.$router.push( { name: 'dashboard' } );
					}
                });
            }
        },
    }
</script>