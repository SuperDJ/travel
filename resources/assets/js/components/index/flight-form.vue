<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs3>
                <v-text-field label="Departure location" required />
                <v-text-field label="Departure time" type="date" required />
            </v-flex>

            <v-flex xs3>
                <v-text-field label="Destination" required/>
                <v-text-field label="Return date" type="date"/>
            </v-flex>

            <v-flex xs3>
                <v-text-field label="Number of adults" type="number" min="1" required/>
                <v-text-field label="Number of children" type="number" min="0"/>
            </v-flex>

            <v-flex xs3>
                <v-select
                    :items="[
                        {text: 'Economy', value: 'economy'},
                        {text: 'Economy plus', value: 'premiumeconomy'},
                        {text: 'Business', value: 'business'},
                        {text: 'First', value: 'first'}
                    ]"
                    label="Class"
                    single-line
                    bottom
                />
            </v-flex>
        </v-layout>
    </v-container>
</template>