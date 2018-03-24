<template>
    <div>
        <v-btn color="primary" slot="activator" :to="{ name: 'countryCreate' }">
            <v-icon>add</v-icon>
            Add country
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
                    <th>Actions</th>
                </tr>
            </template>

            <template slot="items" slot-scope="props">
                <tr>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.iso }}</td>
                    <td>{{ props.item.continent.name }}</td>
                    <td>{{ props.item.currency.name }}</td>
                    <td>{{ props.item.language.name }}</td>
                    <td class="text-xs-right">{{ props.item.cities_count }}</td>
                    <td class="text-xs-right">{{ props.item.timezones_count }}</td>
                    <td class="text-xs-right">{{ props.item.profile_count }}</td>
                    <td>
                        <v-btn icon :to="{ name: 'countryEdit', params: { country: props.item.id } }">
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
                    <span class="headline">Delete country</span>
                </v-card-title>

                <v-card-text>
                    Are you sure you want to delete country: <strong>{{ deleteItem.name }}</strong>?
                </v-card-text>

                <v-card-actions>
                    <v-btn flat color="green" @click="deleteItem = {}">Cancel</v-btn>
                    <v-btn flat color="red" @click="countryDestroy( deleteItem.id )">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
	export default
	{
		metaInfo: {
			title: 'Countries'
		},

		data()
		{
			return {
				pagination: {},
				loading: false,
                deleteItem: {},
				headers: [
					{
						text: 'Country',
						align: 'left',
						value: 'name'
					},
					{
						text: 'ISO',
						align: 'left',
						value: 'iso',
					},
					{
						text: 'Continent',
						align: 'left',
						value: 'continent_id',
					},
					{
						text: 'Currency',
						align: 'left',
						value: 'currency_id',
					},
					{
						text: 'Language',
						align: 'left',
						value: 'language_id',
					},
					{
						text: 'Cities',
						align: 'right',
						value: 'cities_count'
					},
                    {
                    	text: 'Timezones',
                        align: 'right',
                        value: 'timezones_count'
                    },
					{
						text: 'Users',
						align: 'right',
						value: 'profile_count'
					},
                    {
                    	text: 'Actions',
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
				return this.$store.getters.countryIndex;
			},

			totalItems()
			{
				return this.$store.getters.countryTotal;
			}
		},

		methods: {
			data()
			{
				this.loading = true;

				this.$store.dispatch( 'countryIndex', this.pagination ).then( () => {
					this.loading = false;
				});
			},

            countryDestroy( id )
            {
                this.loading = true;

                this.$store.dispatch( 'countryDestroy', id ).then( () =>
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