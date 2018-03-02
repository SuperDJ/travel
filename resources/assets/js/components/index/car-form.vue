<template>
    <v-card hover>
        <v-card-text>
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
        </v-card-text>

        <v-card-actions>
            <v-btn flat color="primary">
                <v-icon>search</v-icon>
                Search car rentals
            </v-btn>
        </v-card-actions>
    </v-card>
</template>