<template>
    <div class="full-width">
        <Appbar title="Home" drawer-id="drawer">
            <Icon name="search"/>
            <Icon name="person" class="trigger" trigger="profile-menu"/>

            <Menu class="appbar-menu" trigger="profile-menu">
                <router-link to="/login"><Icon name="power_settings_new"/> Aanmelden</router-link>
                <router-link to="/register"><Icon name="person_add"/> Aanmelden</router-link>
            </Menu>

            <Icon name="more_vert" class="trigger" trigger="settings-menu"/>

            <Menu class="appbar-menu" trigger="settings-menu">
                <a href="#">Taal</a>
                <a href="#">Valuta</a>
            </Menu>
        </Appbar>

        <NavigationDrawer class="drawer-persistent" trigger="drawer">
            <div slot="header" class="drawer-header">
                <img src="http://www.dierenafbeeldingen.com/data/media/32/aap.jpg" alt="SMaterial profile example" class="drawer-profile-img">
                <div class="drawer-profile-name">John</div>
                <div id="drawer-profile-more" class="drawer-profile-more">
                    <Icon name="arrow_drop_down" class="trigger" trigger="profile"/>

                    <Menu trigger="profile">
                        <a href="#"><Icon name="power_settings_new"/> Aanmelden</a>
                        <a href="#"><Icon name="person_add"/> Registeren</a>
                    </Menu>
                </div>
                <div><i class="material-icons arrow trigger" data-trigger="drawer">chevron_left</i></div>
            </div>

            <div slot="content">
                <div v-for="item in menuItems" :key="item.button">
                    <router-link v-if="item.to" :class="{'drawer-dropdown': item.items}" :to="item.to"
                                 router-link-exact-active="active">
                        <Icon v-if="item.icon" :name="item.icon"/>
                        {{item.button}}
                        <Icon v-if="item.items" name="expand_more"/>
                    </router-link>
                    <a v-else :class="{'drawer-dropdown': item.items}">
                        <Icon v-if="item.icon" :name="item.icon"/>
                        {{item.button}}
                        <Icon v-if="item.items" name="expand_more"/>
                    </a>

                    <div v-if="item.items" class="dropdown">
                        <router-link router-link-exact-active="active" v-for="link in item.items" :key="link.name"
                                     :to="link.to">{{link.name}}</router-link>
                    </div>
                </div>
            </div>
        </NavigationDrawer>

        <main>
            <slot name="content"/>
        </main>
    </div>
</template>

<script>
    import Appbar from '@/components/Appbar';
    import NavigationDrawer from '@/components/NavigationDrawer';
    import Menu from '@/components/Menu';

    export default {
        metaInfo: {
    	    title: 'Home',
            link: [
            	{rel: 'stylesheet', href: '/css/web.css'}
            ]
        },

		components: {
			'Appbar': Appbar,
            'NavigationDrawer': NavigationDrawer,
            'Menu': Menu,
		},

        data() {
			return {
				menuItems: [
                    {
                    	button: 'Home',
                        to: '/',
                        icon: 'home'
                    },
                    {
                    	button: 'Accomodaties',
                        to: '/accomodations',
                        icon: 'hotel'
                    },
                    {
                    	button: 'Vluchten',
                        to: '/flights',
                        icon: 'flight'
                    },
                    {
                    	button: 'Autoverhuur',
                        to: '/car-rental',
                        icon: 'directions_car'
                    },
                    {
                    	button: 'Bestemmingen',
                        items: [
                            {name: 'Europa', to: '/location/europe'},
                            {name: 'Azië', to: '/location/asia'},
                            {name: 'Amerika', to: '/location/america'},
                            {name: 'Afrika', to: '/location/africa'},
                            {name: 'Australië', to: '/location/australia'}
                        ]
                    }
                ]
            }
        }
    }
</script>