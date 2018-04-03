<template>
    <div>
        <v-btn color="primary" slot="activator" :to="{ name: 'roleCreate' }">
            <v-icon>add</v-icon>
            Add role
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
                    <td class="text-xs-right">{{ props.item.permissions_count }}</td>
                    <td class="text-xs-right">{{ props.item.users_count }}</td>
                    <td>
                        <v-btn icon :to="{ name: 'roleEdit', params: { role: props.item.id } }">
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
                    <span class="headline">Delete role</span>
                </v-card-title>

                <v-card-text>
                    Are you sure you want to delete role: <strong>{{ deleteItem.name }}</strong>?
                </v-card-text>

                <v-card-actions>
                    <v-btn flat color="green" @click="deleteItem = {}">Cancel</v-btn>
                    <v-btn flat color="red" @click="roleDestroy( deleteItem.id )">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
	export default
	{
		metaInfo: {
			title: 'Roles'
		},

		data()
		{
			return {
				pagination: {},
				loading: false,
                deleteItem: {},
				headers: [
					{
						text: 'Role',
						align: 'left',
						value: 'name'
					},
					{
						text: 'Permissions',
						align: 'right',
						value: 'permissions_count',
					},
					{
						text: 'Users',
						align: 'right',
						value: 'users_count'
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
				return this.$store.getters.roleIndex;
			},

			totalItems()
			{
				return this.$store.getters.roleTotal;
			}
		},

		methods: {
			data()
			{
				this.loading = true;

				this.$store.dispatch( 'roleIndex', this.pagination ).then( () => {
					this.loading = false;
				});
			},

            roleDestroy( id )
            {
                this.loading = true;

                this.$store.dispatch( 'roleDestroy', id ).then( () =>
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