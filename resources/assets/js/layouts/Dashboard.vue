<template>
    <v-app dark>
        <v-toolbar color="primary">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"/>

            <v-toolbar-title>{{ this.$route.meta.title }}</v-toolbar-title>

            <v-spacer />

            <v-btn icon><v-icon>search</v-icon></v-btn>
        </v-toolbar>

        <v-navigation-drawer fixed temporary v-model="drawer">
            <v-list class="pt-0" dense>
                <template v-for="item in items">
                    <v-layout row v-if="item.heading" align-center :key="item.heading">
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
                        </v-flex>

                        <v-flex xs6 class="text-xs-center">
                            <a href="#!" class="body-2 black--text">EDIT</a>
                        </v-flex>
                    </v-layout>

                    <v-list-group v-else-if="item.children" v-model="item.model" :key="item.title" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.title }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile v-for="(child, i) in item.children" :key="i" :to="{ name: child.to }">
                            <v-list-tile-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                                <v-list-tile-title>{{ child.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>

                    <v-list-tile v-else :key="item.title" :to="{ name: item.to }">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-container fluid>
            <router-view></router-view>
        </v-container>
    </v-app>
</template>

<script>
    export default
    {
    	data()
        {
        	return {
        		drawer: false,
                items: [
                    {
                    	title: 'Overview',
                        to: 'dashboard',
                        icon: 'home'
                    },
                    {
                    	title: 'Users',
                        to: 'dashboardUsers',
                        icon: 'person'
                    },
                    {
                    	title: 'Groups',
                        to: 'dashboardGroups',
                        icon: 'group'
                    },
                    {
                    	title: 'Languages',
                        to: 'dashboardLanguages',
                        icon: 'translate'
                    },
                    {
                        title: 'Timezones',
                        to: 'dashboardTimezones',
                        icon: 'access_time'
                    },
                    {
                    	title: 'Currencies',
                        to: 'dashboardCurrencies',
                        icon: 'attach_money'
                    },
                    {
                    	title: 'Continents',
                        to: 'dashboardContinents',
                        icon: 'public'
                    },
                    {
                    	title: 'Countries',
                        to: 'dashboardCountries',
                        icon: 'pin_drop'
                    },
                    {
                    	title: 'Cities',
                        to: 'dashboardCities',
                        icon: 'place'
					},
                    {
                    	title: 'Airports',
                        to: 'dashboardAirports',
                        icon: 'local_airport'
                    },
                    {
                    	title: 'Airlines',
                        to: 'dashboardAirlines',
                        icon: 'flight_takeoff'
                    },
					{
						title: 'Contacts',
						to: 'dashboardContacts',
						icon: 'contacts'
					},
                ]
            }
        }
    }
</script>