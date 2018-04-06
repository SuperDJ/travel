<template>
    <form @submit.prevent="submit( form )">
        <v-text-field
            label="Role name"
            v-model="form.name"
            required
            :error-messages="errors['name']"
        />

        <h2 class="headline">Permissions</h2>

        <v-list subheader>
            <div v-for="(permission, controller) in controllers" :key="controller">
                <v-subheader>
                    {{ controller.charAt( 0 ).toUpperCase() + controller.slice( 1 ) }}
                </v-subheader>

                <v-list-tile v-for="method in permission" :key="method.method">
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <v-checkbox
                                v-model="form.permissions"
                                :value="method.id"
                                :label="method.method"
                            ></v-checkbox>
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider />
            </div>
        </v-list>

        <v-btn color="primary" type="submit">
            <v-icon>save</v-icon>
            {{ $t( 'role.save' ) }}
        </v-btn>

        <v-btn flat :to="{ name: 'roleIndex' }">
            <v-icon>arrow_back</v-icon>
            {{ $t( 'back') }}
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
                    permissions: [],
				}
            }
        },

        computed: {
    	    errors()
            {
            	return this.$store.getters.errors;
            },

			controllers()
			{
				const permissions = this.$store.getters.permissionIndex;

				let object = {};
				permissions.map( ( permission ) => {
					let name = permission.name.split( '.' );
					let controller = name[0];
					let method = name[1];

					if( !object[controller] )
					{
						object[controller] = [];
					}
					object[controller].push( { method: method, id: permission.id } );
				});

				return object;
			}
		},

        methods: {
    		submit( data ) {
    		    let details = {
    		    	name: data.name.charAt( 0 ).toUpperCase() + data.name.slice( 1 )
                };

                this.$emit( 'submitted', Object.assign( data, details ) );
            },
        },

        watch: {
        	details( after )
            {
            	this.form = after;
            }
        },

        created()
        {
        	this.$store.dispatch( 'permissionIndex' );
        }
    }
</script>