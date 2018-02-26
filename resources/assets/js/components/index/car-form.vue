<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs6>
                <v-text-field label="Pickup location" required />
                <v-text-field label="Pickup date and time" type="date-time" required />
            </v-flex>

            <v-flex xs6>
                <v-text-field label="Return location" required min="1"/>
                <v-text-field label="Return date and time" type="date-time" required min="1"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>