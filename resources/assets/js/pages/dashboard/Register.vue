<template>
    <v-card>
        <form @keyup.enter="submit">
            <v-card-text>
                <h1 class="display-4">Register</h1>

                <v-text-field label="Email address" required v-model="email" />

                <v-text-field label="First name" required v-model="first_name" />

                <v-text-field label="Last name" required v-model="last_name" />

                <v-text-field
                    label="Password"
                    hint="At least 8 characters"
                    min="8"
                    :append-icon="passwordVisible ? 'visibility_off' : 'visibility'"
                    :append-icon-cb="() => (passwordVisible = !passwordVisible)"
                    :type="passwordVisible ? 'text' : 'password'"
                    required
                    v-model="password"
                />

                <v-text-field
                    label="Password repeat"
                    hint="At least 8 characters and must match password"
                    min="8"
                    :append-icon="passwordRepeatVisible ? 'visibility_off' : 'visibility'"
                    :append-icon-cb="() => (passwordRepeatVisible = !passwordRepeatVisible)"
                    :type="passwordRepeatVisible ? 'text' : 'password'"
                    required
                    v-model="passwordRepeat" />
            </v-card-text>

            <v-card-actions>
                <v-btn @click="submit" color="primary">Register</v-btn>

                <v-btn flat color="primary" :to="{name: 'Login'}">Login</v-btn>

                <v-btn flat color="primary" :to="{name: 'Index'}">Back to website</v-btn>
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
            	first_name: '',
                last_name: '',
                passwordRepeat: '',
                passwordVisible: false,
                passwordRepeatVisible: false,
                currency: null,
                country: null,
                language: null,
            }
        },

    	computed: {
    		email: {
    			get()
                {
                	return this.$store.getters.userEmail;
                },
                set( email )
                {
                	this.$store.commit( 'userEmail', email );
                }
            },
            password: {
    			get()
                {
                	return this.$store.getters.userPassword;
                },
                set( password )
                {
                	this.$store.commit( 'userPassword', password );
                }
            },
        },

        methods: {
			submit()
            {
            	let data = {
            	    email: this.email,
                    password: this.password,
                    passwordRepeat: this.passwordRepeat,
                    country: this.country,
                    currency: this.currency,
                    language: this.language,
                };

            	this.$store.commit( 'userRegister', data );
            }
        },
    }
</script>