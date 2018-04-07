<template>
    <form @submit.prevent="submit( form )">
        <v-text-field
            :label="$tc( 'continent.continent', 0 )"
            v-model="form.name"
            required
            :error-messages="errors['name']"
        />

        <v-text-field
            :label="`${ $tc( 'continent.continent', 0 ) } ISO code`"
            v-model="form.iso"
            required
            minlength="2"
            maxlength="2"
            :error-messages="errors['iso']"
        />

        <v-btn color="primary" type="submit">
            <v-icon>save</v-icon>
            {{ $t( 'continent.save' ) }}
        </v-btn>

        <v-btn flat :to="{ name: 'continentIndex' }">
            <v-icon>arrow_back</v-icon>
            {{ $tc( 'back', 1 ) }}
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