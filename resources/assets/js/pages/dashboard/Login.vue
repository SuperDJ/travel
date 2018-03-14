<template>
    <v-card>
        <form @keyup.enter="submit">
            <v-card-text>
                <h1 class="display-4">Login</h1>

                <v-text-field label="Email address" required v-model="email" />

                <v-text-field label="Password" type="password" required v-model="password" />
            </v-card-text>

            <v-card-actions>
                <v-btn @click="submit" color="primary">Login</v-btn>

                <v-btn flat color="primary" :to="{name: 'Register'}">Register</v-btn>

                <v-btn flat color="primary" :to="{name: 'Index'}">Back to website</v-btn>
            </v-card-actions>
        </form>
    </v-card>
</template>

<script>
    export default
    {
		metaInfo: {
			title: 'Login'
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
            }
        },

        methods: {
        	submit() {
        		let data = {
        			email: this.email,
                    password: this.password
                };

                this.$store.dispatch( 'userLogin', data);
            }
        }
    }
</script>