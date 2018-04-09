<template>
    <v-app dark>
        <v-toolbar color="primary">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"/>

            <v-toolbar-title>{{ this.$route.meta.title }}</v-toolbar-title>

            <v-spacer />

            <v-btn icon><v-icon>search</v-icon></v-btn>
        </v-toolbar>

        <v-navigation-drawer fixed temporary v-model="drawer">
            <v-toolbar flat class="transparent">
                <v-list>
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img src="https://randomuser.me/api/portraits/men/85.jpg" >
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ userProfile['first_name'] }} {{ userProfile['last_name'] }}

                                <v-menu>
                                    <v-icon slot="activator">expand_more</v-icon>

                                    <v-list>
                                        <v-list-tile :to="{ name: 'userEdit', params: { user: userProfile['id'] } }">
                                            <v-list-tile-action>
                                                <v-icon>edit</v-icon>
                                            </v-list-tile-action>
                                            <v-list-tile-title>
                                                {{ $t( 'user.profileEdit' ) }}
                                            </v-list-tile-title>
                                        </v-list-tile>
                                        <v-list-tile>
                                            <v-list-tile-action>
                                                <v-icon>person_add</v-icon>
                                            </v-list-tile-action>
                                            <v-list-tile-title>Google account</v-list-tile-title>
                                        </v-list-tile>
                                        <v-list-tile>
                                            <v-list-tile-action>
                                                <v-icon>person_add</v-icon>
                                            </v-list-tile-action>
                                            <v-list-tile-title>Facebook account</v-list-tile-title>
                                        </v-list-tile>
                                        <v-list-tile @click.stop="logout">
                                            <v-list-tile-action>
                                                <v-icon>exit_to_app</v-icon>
                                            </v-list-tile-action>
                                            <v-list-tile-title>{{ $t( 'user.logout' ) }}</v-list-tile-title>
                                        </v-list-tile>
                                    </v-list>
                                </v-menu>
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-list dense>
                <template v-for="item in items">
                    <v-layout
                        row
                        v-if="item.heading"
                        align-center
                        :key="item.heading"
                    >
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

                        <v-list-tile
                            v-for="( child, i ) in item.children"
                            :key="i"
                            :to="{ name: child.to }"
                        >
                            <v-list-tile-action>
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
                'errors',
                'userProfile'
            ]),
        },

        methods: {
    	    logout()
            {
            	this.$store.commit('userLogout');

            	this.$router.push( { name: 'index' } );
            }
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
                    	title: this.$i18n.tc( 'user.user', 1 ),
                        icon: 'person',
                        children: [
                            {
                            	title: this.$i18n.tc( 'user.user', 1 ),
                                to: 'userIndex',
                                can: 'user.index'
                            },
                            {
                            	title: this.$i18n.tc( 'role.role', 1 ),
                                to: 'roleIndex',
                                can: 'role.index'
                            },
                            {
                            	title: this.$i18n.tc( 'permission.permission', 1 ),
                                to: 'permissionIndex',
                                can: 'permission.index'
                            }
                        ]
                    },
                    {
                    	title: this.$i18n.tc( 'language.language', 1 ),
                        to: 'languageIndex',
                        icon: 'translate',
                        can: 'language.index'
                    },
                    {
                        title: this.$i18n.tc( 'timezone.timezone', 1 ),
                        to: 'timezoneIndex',
                        icon: 'access_time',
                        can: 'timezone.index'
                    },
                    {
                    	title: this.$i18n.tc( 'currency.currency', 1 ),
                        to: 'currencyIndex',
                        icon: 'attach_money',
                        can: 'currency.index'
                    },
                    {
                    	title: this.$i18n.tc( 'continent.continent', 1 ),
                        to: 'continentIndex',
                        icon: 'public',
                        can: 'continent.index'
                    },
                    {
                    	title: this.$i18n.tc( 'country.country', 1 ),
                        to: 'countryIndex',
                        icon: 'pin_drop',
                        can: 'country.index'
                    },
                    {
                    	title: this.$i18n.tc( 'city.city', 1 ),
                        to: 'cityIndex',
                        icon: 'place',
                        can: 'city.index'
					},
                    {
                    	title: this.$i18n.tc( 'airport.airport', 1 ),
                        to: 'airportIndex',
                        icon: 'local_airport',
                        can: 'airport/index'
                    },
                    {
                    	title: this.$i18n.tc( 'airline.airline', 1 ),
                        to: 'airlineIndex',
                        icon: 'flight_takeoff',
                        can: 'airline.index'
                    },
					{
						title: this.$i18n.tc( 'contact.contact', 1 ),
						to: 'contactIndex',
						icon: 'contacts',
                        can: 'contact.index'
					},
                ]
            }
        }
    }
</script>