<template>
    <div>
        <v-btn color="primary" slot="activator" :to="{ name: 'permissionCreate' }">
            <v-icon>add</v-icon>
            Add permission
        </v-btn>

        <v-btn color="primary" slot="activator" flat @click.prevent="permissionServer">
            <v-icon>add</v-icon>
            Check server permissions
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
                    <td>{{ props.item.name.replace( '.', ' ' ) }}</td>
                    <td>{{ props.item.roles_count }}</td>
                    <td>
                        <v-btn icon :to="{ name: 'permissionEdit', params: { permission: props.item.id } }">
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
                    <span class="headline">Delete permission</span>
                </v-card-title>

                <v-card-text>
                    Are you sure you want to delete permission: <strong>{{ deleteItem.name }}</strong>?
                </v-card-text>

                <v-card-actions>
                    <v-btn flat color="green" @click="deleteItem = {}">Cancel</v-btn>
                    <v-btn flat color="red" @click="permissionDestroy( deleteItem.id )">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
	export default
	{
		metaInfo: {
			title: 'Permissions'
		},

		data()
		{
			return {
				pagination: {},
				loading: false,
                deleteItem: {},
				headers: [
					{
						text: 'Permission',
						align: 'left',
						value: 'name'
					},
					{
						text: 'Roles',
						align: 'right',
						value: 'roles_count',
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
				return this.$store.getters.permissionIndex;
			},

			totalItems()
			{
				return this.$store.getters.permissionTotal;
			}
		},

		methods: {
			data()
			{
				this.loading = true;

				this.$store.dispatch( 'permissionIndex', this.pagination ).then( () => {
					this.loading = false;
				});
			},

            permissionDestroy( id )
            {
                this.loading = true;

                this.$store.dispatch( 'permissionDestroy', id ).then( () =>
				{
					this.data(); // Refresh data
                    this.deleteItem = {};
				});
            },

            permissionServer()
            {
            	this.loading = true;

            	this.$store.dispatch( 'permissionServer' ).then( () => {
            	    this.data();
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