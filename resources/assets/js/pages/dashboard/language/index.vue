<template>
    <div>
        <v-btn color="primary" slot="activator" :to="{ name: 'languageCreate' }">
            <v-icon>add</v-icon>
            Add language
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
                    <td class="text-xs-right">{{ props.item.country_count }}</td>
                    <td class="text-xs-right">{{ props.item.profile_count }}</td>
                    <td>
                        <v-btn icon :to="{ name: 'languageTranslate', params: { language: props.item.id } }">
                            <v-icon color="blue">translate</v-icon>
                        </v-btn>

                        <v-btn icon :to="{ name: 'languageEdit', params: { language: props.item.id } }">
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
                    <span class="headline">Delete language</span>
                </v-card-title>

                <v-card-text>
                    Are you sure you want to delete language: <strong>{{ deleteItem.name }}</strong>?
                </v-card-text>

                <v-card-actions>
                    <v-btn flat color="green" @click="deleteItem = {}">Cancel</v-btn>
                    <v-btn flat color="red" @click="languageDestroy( deleteItem.id )">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
	export default
	{
		metaInfo: {
			title: 'Languages'
		},

		data()
		{
			return {
				pagination: {},
				loading: false,
                deleteItem: {},
				headers: [
					{
						text: 'Language',
						align: 'left',
						value: 'name'
					},
					{
						text: 'ISO',
						align: 'left',
						value: 'iso',
					},
					{
						text: 'Countries',
						align: 'right',
						value: 'country_count'
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
				return this.$store.getters.languageIndex;
			},

			totalItems()
			{
				return this.$store.getters.languageTotal;
			}
		},

		methods: {
			data()
			{
				this.loading = true;

				this.$store.dispatch( 'languageIndex', this.pagination ).then( () => {
					this.loading = false;
				});
			},

            languageDestroy( id )
            {
                this.loading = true;

                this.$store.dispatch( 'languageDestroy', id ).then( () =>
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