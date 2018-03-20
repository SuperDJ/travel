<template>
    <form @submit="submit( form )">
        <v-text-field
            v-model="form.name"
            required
        />


        <v-text-field
            v-model="form.iso"
            required
            maxlength="2"
        />
    </form>
</template>