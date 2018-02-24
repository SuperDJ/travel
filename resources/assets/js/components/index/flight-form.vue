<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs3>
                <v-text-field label="Vertrek punt" required />
                <v-text-field label="Vertrek datum" type="date" required />
            </v-flex>

            <v-flex xs3>
                <v-text-field label="Bestemming" required/>
                <v-text-field label="Retour datum" type="date"/>
            </v-flex>

            <v-flex xs3>
                <v-text-field label="Volwassenen" type="number" min="1" required/>
                <v-text-field label="Kinderen" type="number" min="0"/>
            </v-flex>

            <v-flex xs3>
                <v-select
                    :items="[
                        {text: 'Economy', value: 'economy'},
                        {text: 'Economy plus', value: 'premiumeconomy'},
                        {text: 'Business', value: 'business'},
                        {text: 'First', value: 'first'}
                    ]"
                    label="Klasse"
                    single-line
                    bottom
                />
            </v-flex>
        </v-layout>
    </v-container>
</template>