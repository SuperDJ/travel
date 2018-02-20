<template>
    <router-link v-if="to" :class="button-{type}" />
    <button v-else :class="button-{type}" />

</template>

<script>
    export default{
    	props: {
    		type: {
    			type: String,
                required: true,
                validator: function( value ) {
    				const types = ['flat', 'raised'];
    				return types.indexOf( value ) > 0;
                }
            }
        }
    }
</script>