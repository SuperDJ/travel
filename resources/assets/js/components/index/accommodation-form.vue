<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs6>
                <v-text-field label="Check in datum" type="date" required />
                <v-text-field label="Check uit datum" type="date" required />
            </v-flex>

            <v-flex xs6>
                <v-text-field label="Aantal personen" type="number" required min="1"/>
                <v-text-field label="Aantal kamers" type="number" required min="1"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>