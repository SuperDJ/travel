<template v-if="to">
    <button class="button-{type}"/>
</template>
<template v-else>
    <router-link class="button-{type}"/>
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