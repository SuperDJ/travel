<template>
    <form @submit.prevent="submit( form )">
        <v-text-field
            label="First name"
            v-model="form.first_name"
            disabled
            readonly
        />

        <v-text-field
            label="Last name"
            v-model="form.last_name"
            disabled
            readonly
        />

        <v-text-field
            label="Email"
            v-model="form.email"
            disabled
            readonly
        />

        <v-select
            label="Roles"
            v-model="form.roles"
            autocomplete
            :items="roles"
            item-text="name"
            item-value="id"
            no-data="No roles found"
            cache-items
            required
            multiple
            chips
            :error-messages="errors['roles']"
            :search-input.sync="roleSearch"
        />

        <v-btn color="primary" type="submit">
            <v-icon>save</v-icon>
            Save user
        </v-btn>

        <v-btn flat :to="{ name: 'userIndex' }">
            <v-icon>arrow_back</v-icon>
            Back
        </v-btn>
    </form>
</template>

<script>
    export default
    {
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
					first_name: '',
                    last_name: '',
                    email: '',
					roles: []
				},
				roleSearch: null,
			}
		},

		computed: {
			errors()
			{
				return this.$store.getters.errors;
			},

			roles()
			{
				return Object.values( this.$store.getters.roleSearch );
			}
		},

		methods: {
			submit( data )
            {
				this.$emit( 'submitted', data );
			}
		},

		watch: {
			details( after )
			{
				this.form = after;

				console.log(after.roles);

				if( after.roles )
                {
                	for( let i = 0; i < after.roles.length; i++ )
                    {
						this.$store.dispatch( 'roleSearch', after.roles[i].id );
                    }
                }
			},

			roleSearch( role )
			{
				if( role && role.length >= 2 )
				{
					this.$store.dispatch( 'roleSearch', role );
				}
			},
		}
    }
</script>