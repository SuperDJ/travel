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
            <v-btn type="submit" color="primary">{{ $t( 'user.login' ) }}</v-btn>

            <v-btn flat color="primary" :to="{name: 'register'}">{{ $t( 'user.register' ) }}</v-btn>

            <v-btn flat color="primary" :to="{name: 'index'}">Back to website</v-btn>
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
					if( sessionStorage.getItem( 'token' ) && sessionStorage.getItem( 'token' ).length > 0 ) {
						// Set user permissions
						let controllers = {};
						this.$store.getters.userPermissions.map( ( permission ) => {
							let name = permission.split( '.' );
							let controller = name[0];
							let method = name[1];

							if( !controllers[controller] )
							{
								controllers[controller] = [];
							}
							controllers[controller].push( method );
						});

						let permissions = [];
						for( let i = 0; i < Object.keys( controllers ).length; i++ )
                        {
                        	permissions.push( {
                                actions: Object.values( controllers )[i],
                                subject: Object.keys( controllers )[i]
                        	});
                        }

                        this.$ability.update(permissions);

						this.$router.push( { name: 'dashboard' } );
					}
                });
            }
        },
    }
</script>