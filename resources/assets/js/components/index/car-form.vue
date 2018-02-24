<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs6>
                <v-text-field label="Ophaal locatie" required />
                <v-text-field label="Ophaal datum en tijd" type="date-time" required />
            </v-flex>

            <v-flex xs6>
                <v-text-field label="Aflever locatie" required min="1"/>
                <v-text-field label="Aflever datum en tijd" type="date-time" required min="1"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>