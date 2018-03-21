<template>
    <form @submit.prevent="submit( form )">
        <v-text-field
            label="Continent name"
            v-model="form.continentName"
            required
            :error-messages="errors['name']"
        />

        <v-text-field
            label="Continent ISO code"
            v-model="form.continentIso"
            required
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
    		name: {
    			type: String
            },
            iso: {
    			type: String
            }
        },

        data()
        {
        	return {
        		form: {
					continentName: this.name,
                    continentIso: this.iso
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
    		    	name: data.continentName.charAt( 0 ).toUpperCase() + data.continentName.slice( 1 ),
                    iso: data.continentIso.toUpperCase(),
                };

                this.$emit( 'submitted', details );
            }
        }
    }
</script>