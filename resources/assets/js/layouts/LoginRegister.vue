<template>
    <v-app>
        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs12 md4 offset-md4>
                    <v-card>
                        <v-card-title primary-title class="headline white--text primary">{{ this.$route.meta.title }}</v-card-title>

                        <v-alert :type="success ? 'success' : 'error'" :value="message && message.length > 1" transition="scale-transition">
                            {{ message }}
                        </v-alert>

                        <router-view></router-view>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
    	computed: {
			...mapGetters([
				'message',
				'success',
			])
		}
    }
</script>

<style scoped>
    .container {
        background: url(https://images.pexels.com/photos/533678/pexels-photo-533678.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb);
        background-size: cover;
        background-repeat: no-repeat;
        height: 100%;
        margin: 0;
        padding: 0;
    }

</style>