<template>
    <nav class="drawer" :id="trigger">
        <slot name="header"/>

        <slot name="content"/>
    </nav>
</template>

<script>
    export default {
    	props: {
    	    trigger: {
    	    	type: String,
                required: true,
                default: ''
            }
        }
    }
</script>
