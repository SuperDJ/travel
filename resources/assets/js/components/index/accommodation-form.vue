<template>
    <div>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout row wrap>
                    <v-flex xs6>
                        <v-text-field label="Check in date" type="date" required />
                        <v-text-field label="Check out date" type="date" required />
                    </v-flex>

                    <v-flex xs6>
                        <v-text-field label="Number of persons" type="number" required min="1"/>
                        <v-text-field label="Number of rooms" type="number" required min="1"/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-btn flat color="primary">
                <v-icon>search</v-icon>
                Search accommodations
            </v-btn>
        </v-card-actions>
    </div>
</template>