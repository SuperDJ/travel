<template>
    <nav class="menu" :id="trigger"><slot/></nav>
</template>

<script>
    export default
    {
        props: {
        	trigger: {
        		type: String,
                required: true,
                default: ''
            }
        }
    }
</script>