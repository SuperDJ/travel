<template>
    <div>
        <Appbar title="Home">
            <Icon name="search"/>
            <Icon name="person"/>
            <Icon name="more_vert"/>
        </Appbar>

        <NavigationDrawer class="drawer-permanent">
            <div slot="content">

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
		}
    }
</script>

<style lang="scss">
    @import '../../scss/smaterial.scss';
</style>