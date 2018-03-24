<template>
    <form @submit.prevent="submit( form )">
        <v-text-field
            label="Airport name"
            v-model="form.name"
            required
            :error-messages="errors['name']"
        />

        <v-text-field
            label="Airport ICAO code"
            v-model="form.icao"
            required
            minlength="4"
            maxlength="4"
            :error-messages="errors['icao']"
        />

        <v-text-field
            label="Airport IATA code"
            v-model="form.iata"
            required
            minlength="3"
            maxlength="3"
            :error-messages="errors['iata']"
        />

        <v-text-field
            label="Airport location latitude"
            v-model="form.latitude"
            required
            :error-messages="errors['latitude']"
        />

        <v-text-field
            label="Airport location longitude"
            v-model="form.longitude"
            required
            :error-messages="errors['longitude']"
        />

        <v-select
            label="City"
            v-model.number="form.city_id"
            autocomplete
            :items="cities"
            item-text="name"
            item-value="id"
            no-data="No city found"
            cache-items
            required
            :error-messages="errors['city_id']"
            :search-input.sync="citySearch"
        />

        <v-btn color="primary" type="submit">
            <v-icon>save</v-icon>
            Save city
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
					iata: '',
					latitude: '',
					longitude: '',
					city_id: null,
				},
				citySearch: null,
			}
		},

		computed: {
			errors()
			{
				return this.$store.getters.errors;
			},

			cities()
			{
				return Object.values( this.$store.getters.citySearch );
			}
		},

		methods: {
			submit( data ) {
				let details = {
					name: data.name.charAt( 0 ).toUpperCase() + data.name.slice( 1 ),
					icao: data.icao.toUpperCase(),
					iata: data.iata.toUpperCase(),
				};

				this.$emit( 'submitted', Object.assign( data, details ) );
			}
		},

		watch: {
			details( after )
			{
				this.form = after;
				this.$store.dispatch( 'citySearch', after.city_id );
			},

			citySearch( city )
			{

				if( city && city.length >= 2 )
				{
					this.$store.dispatch( 'citySearch', city );
				}
			},
		}
	}
</script>