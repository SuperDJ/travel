<template>
    <v-app>
        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs12 md4 offset-md4>
                    <router-view></router-view>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

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