<template>
    <form @submit.prevent="submit( form )">
        <v-text-field
            :label="$tc( 'airline.airline', 0 )"
            v-model="form.name"
            required
            :error-messages="errors['name']"
        />

        <v-text-field
            :label="`${ $tc( 'airline.airline', 0 ) } callsign`"
            v-model="form.callsign"
            required
            :error-messages="errors['callsign']"
        />

        <v-text-field
            :label="`${ $tc( 'airline.airline', 0 ) } ICAO code`"
            v-model="form.icao"
            required
            minlength="3"
            maxlength="3"
            :error-messages="errors['icao']"
        />

        <v-text-field
            :label="`${ $tc( 'airline.airline', 0 ) } ISO code`"
            v-model="form.iso"
            required
            minlength="2"
            maxlength="2"
            :error-messages="errors['iso']"
        />

        <v-btn color="primary" type="submit">
            <v-icon>save</v-icon>
            {{ $t( 'airline.save' ) }}
        </v-btn>

        <v-btn flat :to="{ name: 'airlineIndex' }">
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
					icao: '',
					iso: '',
                    callsign: '',
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
					icao: data.icao.toUpperCase(),
					iso: data.iso.toUpperCase(),
				};

				this.$emit( 'submitted', Object.assign( data, details ) );
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