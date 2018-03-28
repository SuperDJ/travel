<template>
    <form @submit.prevent="submit( form )">
        <v-text-field
            label="Language name"
            v-model="form.name"
            required
            :error-messages="errors['name']"
        />

        <v-btn color="primary" type="submit">
            <v-icon>save</v-icon>
            Save language
        </v-btn>

        <v-btn flat :to="{ name: 'dashboardLanguage' }">
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
                    iso: ''
				}
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
            }
        },

        watch: {
        	details( after )
            {
            	this.form = after;
            }
        }
    }
</script>