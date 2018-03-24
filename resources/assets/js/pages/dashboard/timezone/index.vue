<template>
    <div>
        <v-btn color="primary" slot="activator" :to="{ name: 'timezoneCreate' }">
            <v-icon>add</v-icon>
            Add timezone
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
                    <td>{{ props.item.gmt_offset / 3600 }} hour(s)</td>
                    <td>{{ props.item.country.name }}</td>
                    <td>
                        <v-btn icon :to="{ name: 'timezoneEdit', params: { timezone: props.item.id } }">
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
                    <span class="headline">Delete timezone</span>
                </v-card-title>

                <v-card-text>
                    Are you sure you want to delete timezone: <strong>{{ deleteItem.name }}</strong>?
                </v-card-text>

                <v-card-actions>
                    <v-btn flat color="green" @click="deleteItem = {}">Cancel</v-btn>
                    <v-btn flat color="red" @click="timezoneDestroy( deleteItem.id )">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
	export default
	{
		metaInfo: {
			title: 'Timezones'
		},

		data()
		{
			return {
				pagination: {},
				loading: false,
                deleteItem: {},
				headers: [
					{
						text: 'Timezone',
						align: 'left',
						value: 'name'
					},
					{
						text: 'GMT offset',
						align: 'left',
						value: 'gmt_offset',
					},
					{
						text: 'Country',
						align: 'left',
						value: 'country.name'
					},
                    {
                    	text: 'Actions',
                        align: 'left',
                        value: '',
                    }
				]
			}
		},

		computed: {
			items()
			{
				return this.$store.getters.timezoneIndex;
			},

			totalItems()
			{
				return this.$store.getters.timezoneTotal;
			}
		},

		methods: {
			data()
			{
				this.loading = true;

				this.$store.dispatch( 'timezoneIndex', this.pagination ).then( () => {
					this.loading = false;
				});
			},

            timezoneDestroy( id )
            {
                this.loading = true;

                this.$store.dispatch( 'timezoneDestroy', id ).then( () =>
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