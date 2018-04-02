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
            <div v-for="(permission, controller) in permissions" :key="controller">
                <v-subheader>
                    {{ controller.charAt( 0 ).toUpperCase() + controller.slice( 1 ) }}
                </v-subheader>

                <v-list-tile v-for="method in permission" href="javascript:;" :key="method.method">
                    <v-list-tile-action>
                        <v-checkbox
                            v-model="form[method.id]"
                            readonly
                        ></v-checkbox>
                    </v-list-tile-action>

                    <v-list-tile-content
                        @click="form[method.id]">
                        <v-list-tile-title>
                            {{ method.method }} {{form[method.id]}}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider />
            </div>
        </v-list>

        <v-btn color="primary" type="submit">
            <v-icon>save</v-icon>
            Save language
        </v-btn>

        <v-btn flat :to="{ name: 'roleIndex' }">
            <v-icon>arrow_back</v-icon>
            Back
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
                    permissions: {},
				}
            }
        },

        computed: {
    	    errors()
            {
            	return this.$store.getters.errors;
            },

			permissions()
			{
				const permissions = this.$store.getters.permissionIndex;

				return this.generateObject( permissions );
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

            generateObject( permissions )
            {
				let array = {};
				permissions.map( ( permission ) => {
					let name = permission.name.split( '.' );
					let controller = name[0];
					let method = name[1];

					if( !array[controller] )
					{
						array[controller] = [];
					}
					array[controller].push( {method: method, id: permission.id} );
				});

				// Set default value for all permissions
				permissions.map( value => {
					this.form.permissions[value.id] = false;
				});

				return array;
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
        	this.$store.dispatch( 'permissionIndex' );
        }
    }
</script>