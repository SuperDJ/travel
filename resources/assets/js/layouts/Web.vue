<template>
    <v-app>
        <v-toolbar dark fixed color="primary">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"/>

            <v-toolbar-title>{{ this.$route.meta.title }}</v-toolbar-title>

            <v-spacer />

            <v-btn icon><v-icon>search</v-icon></v-btn>

            <v-menu offset-y fixed>
                <v-btn icon slot="activator"><v-icon>more_vert</v-icon></v-btn>

                <v-list>
                    <div v-if="!this.$store.getters.userLoggedIn">
                        <v-list-tile :to="{ name: 'login' }">Login</v-list-tile>

                        <v-list-tile :to="{ name: 'register' }">Register</v-list-tile>
                    </div>
                    <div v-else>
                        <v-list-tile :to="{ name: 'dashboard' }">Dashboard</v-list-tile>
                    </div>
                </v-list>
            </v-menu>
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

                        <v-list-tile v-for="(child, i) in item.children" :key="i" :to="{ name: child.to, params: child.params }">
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

        <router-view></router-view>
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
                    	title: 'Home',
                        to: 'index',
                        icon: 'home'
                    },
                    {
                    	title: 'Accommodations',
                        to: 'accommodations',
                        icon: 'hotel'
                    },
                    {
                    	title: 'Flights',
                        to: 'flights',
                        icon: 'flight'
                    },
                    {
                    	title: 'Car rental',
                        to: 'car-rental',
                        icon: 'directions_car'
                    },
                    {
                    	title: 'Destinations',
                        icon: 'expand_more',
                        children: [
                            { title: 'Africa', to: '/location/africa' },
                            { title: 'Antarctica', to: '/location/antarctica' },
                            { title: 'Asia', to: '/location/asia' },
                            { title: 'Europe', to: '/location/europe' },
                            { title: 'North America', to: '/location/north-america' },
                            { title: 'Oceania', to: '/location/oceania' },
                            { title: 'South America', to: '/location/south-america' },
                        ]
                    }
                ]
            }
        },
    }
</script>