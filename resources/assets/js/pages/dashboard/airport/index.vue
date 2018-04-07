<template>
    <div>
        <v-btn color="primary" slot="activator" :to="{ name: 'airportCreate' }">
            <v-icon>add</v-icon>
            {{ $t( 'airport.create' ) }}
        </v-btn>

        <v-data-table
            :headers="headers"
            :items="items"
            :totalItems="totalItems"
            item-key="id"
            :loading="loading"
            :pagination.sync="pagination"
        >
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="header" slot-scope="props">
                <tr>
                    <th
                        v-for="header in props.headers"
                        :key="header.text"
                    >
                        <v-icon small>arrow_upward</v-icon>
                        {{ header.text }}
                    </th>
                    <th>{{ $t( 'actions' )}}</th>
                </tr>
            </template>

            <template slot="items" slot-scope="props">
                <tr>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.iata }}</td>
                    <td>{{ props.item.icao }}</td>
                    <td>{{ props.item.city.name }}</td>
                    <td>
                        <v-btn icon :to="{ name: 'airportEdit', params: { airport: props.item.id } }">
                            <v-icon color="green">edit</v-icon>
                        </v-btn>

                        <v-btn icon @click="deleteItem = { name: props.item.name, id: props.item.id }">
                            <v-icon color="red">delete</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>

        <v-dialog v-model="Object.keys( deleteItem ).length > 1" style="max-width: 400px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ $tc( 'airport.delete', 2 ) }}</span>
                </v-card-title>

                <v-card-text>
                    {{ $tc( 'airport.delete', 1 ) }}: <strong>{{ deleteItem.name }}</strong>?
                </v-card-text>

                <v-card-actions>
                    <v-btn flat color="green" @click="deleteItem = {}">{{ $tc( 'cancel', 1 ) }}</v-btn>
                    <v-btn flat color="red" @click="airportDestroy( deleteItem.id )">{{ $tc( 'delete', 1 ) }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
	export default
	{
		metaInfo()
		{
			return {
				title: this.$i18n.tc( 'airport.airport', 1 )
			}
		},

		data()
		{
			return {
				pagination: {},
				loading: false,
                deleteItem: {},
				headers: [
					{
						text: this.$i18n.tc( 'airport.airport', 1 ),
						align: 'left',
						value: 'name'
					},
					{
						text: 'ICAO',
						align: 'left',
						value: 'icao',
					},
					{
						text: 'IATA',
						align: 'left',
						value: 'iata',
					},
					{
						text: this.$i18n.tc( 'city.city', 0 ),
						align: 'left',
						value: 'city_id'
					},
                    {
                    	text: this.$i18n.t( 'actions' ),
                        align: 'left',
                        value: '',
                        sortable: false,
                    }
				]
			}
		},

		computed: {
			items()
			{
				return this.$store.getters.airportIndex;
			},

			totalItems()
			{
				return this.$store.getters.airportTotal;
			}
		},

		methods: {
			data()
			{
				this.loading = true;

				this.$store.dispatch( 'airportIndex', this.pagination ).then( () => {
					this.loading = false;
				});
			},

            airportDestroy( id )
            {
                this.loading = true;

                this.$store.dispatch( 'airportDestroy', id ).then( () =>
				{
					this.data(); // Refresh data
                    this.deleteItem = {};
				});
            }
		},

		watch: {
			pagination: {
				handler() {
					this.data();
				}
			}
		}
	}
</script>