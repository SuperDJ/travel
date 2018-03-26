<template>
    <form @submit.prevent="submit( form )">
        <v-select>

        </v-select>

        <v-btn color="primary" type="submit">
            <v-icon>save</v-icon>
            Save user
        </v-btn>

        <v-btn flat :to="{ name: 'dashboard' }">Back</v-btn>
    </form>
</template>