<template>
    <nav class="drawer" :id="drawerId">
        <div class="drawer-header">
            <slot name="header"/>
        </div>

        <slot name="content"/>
    </nav>
</template>

<script>
    export default {
    	props: {
    	    drawerId: {
    	    	type: String,
                required: true,
                default: ''
            }
        }
    }
</script>
