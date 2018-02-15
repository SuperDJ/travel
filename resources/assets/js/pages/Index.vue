<template>
    <div class="full-width">
        <Appbar title="Home" :drawer-id="drawerId">
            <Icon name="search"/>
            <Icon name="person"/>
            <Icon name="more_vert"/>
        </Appbar>

        <NavigationDrawer class="drawer-persistent" :drawer-id="drawerId">
            <div slot="header">
                <img src="/images/profile-icon.jpg" alt="SMaterial profile example" class="drawer-profile-img">
                <div class="drawer-profile-name">John</div>
                <div id="drawer-profile-more" class="drawer-profile-more">
                    <Icon name="arrow_drop_down" class="trigger" trigger="profile"/>

                    <nav class="menu" id="profile">
                        <a href="#"><Icon name="power_settings_new"/> Aanmelden</a>
                        <a href="#"><Icon name="person_add"/> Registeren</a>
                    </nav>
                </div>
                <div><i class="material-icons arrow trigger" data-trigger="drawer">chevron_left</i></div>
            </div>

            <div slot="content">
                Test
            </div>
        </NavigationDrawer>

        <main>

        </main>
    </div>
</template>

<script>
    import Appbar from '../components/Appbar';
    import NavigationDrawer from '../components/NavigationDrawer';

    export default {
		components: {
			'Appbar': Appbar,
            'NavigationDrawer': NavigationDrawer
		},

        data() {
			return {
				drawerId: 'drawer'
            }
        }
    }
</script>