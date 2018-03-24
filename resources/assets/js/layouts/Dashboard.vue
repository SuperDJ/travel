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
            <v-alert :type="success ? 'success' : 'error'" :value="message && message.length > 1" transition="scale-transition">
                {{ message }}
            </v-alert>

            <router-view></router-view>
        </v-container>
    </v-app>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default
    {
    	computed: {
            ...mapGetters([
            	'message',
                'success',
                'errors'
            ])
        },

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
                        to: 'dashboardUser',
                        icon: 'person'
                    },
                    {
                    	title: 'Groups',
                        to: 'dashboardGroup',
                        icon: 'group'
                    },
                    {
                    	title: 'Languages',
                        to: 'dashboardLanguage',
                        icon: 'translate'
                    },
                    {
                        title: 'Timezones',
                        to: 'dashboardTimezone',
                        icon: 'access_time'
                    },
                    {
                    	title: 'Currencies',
                        to: 'dashboardCurrency',
                        icon: 'attach_money'
                    },
                    {
                    	title: 'Continents',
                        to: 'dashboardContinent',
                        icon: 'public'
                    },
                    {
                    	title: 'Countries',
                        to: 'dashboardCountry',
                        icon: 'pin_drop'
                    },
                    {
                    	title: 'Cities',
                        to: 'dashboardCity',
                        icon: 'place'
					},
                    {
                    	title: 'Airports',
                        to: 'dashboardAirport',
                        icon: 'local_airport'
                    },
                    {
                    	title: 'Airlines',
                        to: 'dashboardAirline',
                        icon: 'flight_takeoff'
                    },
					{
						title: 'Contacts',
						to: 'dashboardContact',
						icon: 'contacts'
					},
                ]
            }
        }
    }
</script>