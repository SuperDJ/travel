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

        {{form.routes}}

        <div v-for="route in routes" :key="route.name">
            <v-checkbox :label="route.name" v-model="form.routes" :value="routes.name"/>
        </div>

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
                    routes: [],
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
						if( item.name && item.name.length > 0 && this.routes.findIndex( i => i.name === item.name ) === -1 )
						{
							this.routes.push( {
								name: item.name
							} );
						}

						if( item.children )
						{
							this.storeRoutes( item.children );
						}
					} else {
                		if( list.name && list.name.length > 0 && this.routes.findIndex( i => i.name === list.name ) === -1 )
						{
							this.routes.push( {
								name: list.name
							} );
						}

                		if( list.children )
                        {
                        	this.storeRoutes( list.children );
                        }
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
                this.storeRoutes( route );
            });
        }
    }
</script>