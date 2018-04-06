<template>
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
            </tr>
        </template>

        <template slot="items" slot-scope="props">
            <tr>
                <td>{{ props.item.first_name }}</td>
                <td>{{ props.item.last_name }}</td>
                <td class="text-xs-right">{{ props.item.roles_count }}</td>
                <td v-if="props.item.profile">{{ props.item.profile.birthday }}</td><td v-else></td>
                <td v-if="props.item.profile && props.item.profile.language">{{ props.item.profile.language.name }}</td><td v-else></td>
                <td v-if="props.item.profile && props.item.profile.country">{{ props.item.profile.country.name }}</td><td v-else></td>
                <td v-if="props.item.profile && props.item.profile.currency">{{ props.item.profile.currency.name }}</td><td v-else></td>
                <td>
                    <v-btn icon :to="{ name: 'userEdit', params: { user: props.item.id } }">
                        <v-icon color="green">edit</v-icon>
                    </v-btn>
                </td>
            </tr>
        </template>
    </v-data-table>
</template>

<script>
    export default
    {
    	metaInfo: {
    	    title: 'Users'
        },

        data()
        {
        	return {
                pagination: {},
                loading: false,
        		headers: [
                    {
                    	text: this.$i18n.t( 'user.firstName' ),
                        align: 'left',
                        value: 'first_name'
                    },
                    {
                    	text: this.$i18n.t( 'user.lastName' ),
                        align: 'left',
                        value: 'last_name',
                    },
					{
						text: this.$i18n.tc( 'role.role', 2 ),
						align: 'right',
						value: 'roles_count',
					},
                    {
                        text: this.$i18n.t( 'user.birthday' ),
                        align: 'left',
                        value: 'profile.birthday',
                        sortable: false,
                    },
                    {
                    	text: this.$i18n.tc( 'language.language', 1 ),
                        align: 'left',
                        value: 'profile.language.name',
						sortable: false,
                    },
					{
						text: this.$i18n.tc( 'country.country', 1 ),
						align: 'left',
						value: 'profile.country.name',
						sortable: false,
					},
                    {
                    	text: this.$i18n.tc( 'currency.currency', 1 ),
                        align: 'left',
                        value: 'profile.currency.name',
						sortable: false,
                    },
                    {
                    	text: this.$i18n.tc( 'actions', 2 ),
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
            	return this.$store.getters.userIndex;
            },

            totalItems()
            {
            	return this.$store.getters.userTotal;
            }
        },

        methods: {
    		data()
            {
            	this.loading = true;

            	this.$store.dispatch( 'userIndex', this.pagination ).then( () => {
				    this.loading = false;
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