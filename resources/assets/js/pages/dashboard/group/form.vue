<template>
    <form @submit.prevent="submit( form )">
        <v-text-field
            label="Group name"
            v-model="form.name"
            required
            :error-messages="errors['name']"
        />

        <v-text-field
            label="Group ISO code"
            v-model="form.iso"
            required
            minlength="2"
            maxlength="2"
            :error-messages="errors['iso']"
        />

        <v-btn color="primary" type="submit">
            <v-icon>save</v-icon>
            Save continent
        </v-btn>
    </form>
</template>

<script>
    export default {
    	props: {
    		details: {
    			type: Object,
                required: false,
                default: null
            }
        },

        data()
        {
        	return {
        		form: {
					name: '',
                    iso: ''
				},
                routes: []
            }
        },

        computed: {
    	    errors()
            {
            	return this.$store.getters.errors;
            }
        },

        methods: {
    		submit( data ) {
    		    let details = {
    		    	name: data.name.charAt( 0 ).toUpperCase() + data.name.slice( 1 ),
                    iso: data.iso.toUpperCase(),
                };

                this.$emit( 'submitted', details );
            },

            storeRoutes( list )
            {
                for( let i = 0; i < ( Array.isArray( list ) ? list.length : Object.keys( list ).length ); i++ )
                {
                	let item = list[i];

                	if( item )
					{
						this.routes.push({
							name: item.name
						});

						if( item.children )
						{
							this.storeRoutes( item.children );
						}
					} else {
                		console.log(list);
                    }
                }
            }
        },

        watch: {
        	details( after )
            {
            	this.form = after;
            }
        },

        created()
        {
            this.$router.options.routes.forEach( route => {
            	//console.log(route);
                this.storeRoutes( route );
            });
        }
    }
</script>