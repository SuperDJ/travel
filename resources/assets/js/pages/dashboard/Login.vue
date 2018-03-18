<template>
    <v-card>
        <v-card-title primary-title class="headline white--text primary">Login</v-card-title>
        <form @keyup.enter="submit( form )" @submit.prevent="submit( form )">
            <v-card-text>
                <v-alert :type="success ? 'success' : 'error'" :value="message && message.length > 1">
                    {{ message }}
                </v-alert>

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

                <v-btn flat color="primary" :to="{name: 'Register'}">Register</v-btn>

                <v-btn flat color="primary" :to="{name: 'Index'}">Back to website</v-btn>
            </v-card-actions>
        </form>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
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
            ...mapGetters([
                'success',
                'message',
                'errors'
            ])
        },

        methods: {
        	submit( data )
            {
                this.$store.dispatch( 'userLogin', data );

                this.$router.push( { name: 'Dashboard' } );
            }
        },
    }
</script>