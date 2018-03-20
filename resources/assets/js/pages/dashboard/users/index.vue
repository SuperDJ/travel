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
                <td v-for="header in headers">
                    {{ props.item[header.value] }}
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
                    	text: 'First name',
                        align: 'left',
                        value: 'first_name'
                    },
                    {
                    	text: 'Last name',
                        align: 'left',
                        value: 'last_name',
                    },
                    {
                        text: 'Birthday',
                        align: 'left',
                        value: 'profile.birthday'
                    },
                    {
                    	text: 'Language',
                        align: 'left',
                        value: 'profile.language.name'
                    },
					{
						text: 'Country',
						align: 'left',
						value: 'profile.language.name'
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