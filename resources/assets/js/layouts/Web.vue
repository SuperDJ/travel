<template>
    <v-app>
        <v-toolbar fixed color="primary">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"/>

            <v-toolbar-title>Home</v-toolbar-title>

            <v-spacer/>

            <v-btn icon><v-icon>search</v-icon></v-btn>

            <v-btn icon><v-icon>more_vert</v-icon></v-btn>
        </v-toolbar>

        <v-navigation-drawer fixed temporary v-model="drawer">
            <!-- Header -->
            <v-toolbar flat class="transparent">
                <v-list>
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img src="https://randomuser.me/api/portraits/men/85.jpg" >
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>John Leider</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <!-- End header -->

            <!-- Menu -->
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

                        <v-list-tile v-for="(child, i) in item.children" :key="i" :to="child.to">
                            <v-list-tile-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                                <v-list-tile-title>{{ child.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>

                    <v-list-tile v-else :key="item.title" :to="item.to">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
            <!-- End menu -->
        </v-navigation-drawer>

        <!-- Content -->
        <router-view></router-view>
        <!-- End content -->
    </v-app>
</template>

<script>
    import Appbar from '@/components/Appbar';
    import NavigationDrawer from '@/components/NavigationDrawer';
    import Menu from '@/components/Menu';

    export default {
        metaInfo: {
    	    title: 'Home'
        },

		components: {
			'Appbar': Appbar,
            'NavigationDrawer': NavigationDrawer,
            'Menu': Menu,
		},

        data() {
			return {
				drawer: false,
				items: [
                    {
                    	title: 'Home',
                        to: '/',
                        icon: 'home'
                    },
                    {
                    	title: 'Accomodaties',
                        to: '/accomodations',
                        icon: 'hotel'
                    },
                    {
                    	title: 'Vluchten',
                        to: '/flights',
                        icon: 'flight'
                    },
                    {
                    	title: 'Autoverhuur',
                        to: '/car-rental',
                        icon: 'directions_car'
                    },
                    {
                    	title: 'Bestemmingen',
                        icon: 'expand_more',
                        children: [
                            {title: 'Europa', to: '/location/europe'},
                            {title: 'Azië', to: '/location/asia'},
                            {title: 'Amerika', to: '/location/america'},
                            {title: 'Afrika', to: '/location/africa'},
                            {title: 'Australië', to: '/location/australia'}
                        ]
                    }
                ]
            }
        }
    }
</script>