<template>
    <i class="material-icons" :class="{trigger}" :data-trigger="trigger">{{name}}</i>
</template>

<script>
    export default
    {
        props: {
            name: {
            	type: String,
				required: true,
				default: ''
			},
            trigger: {
            	type: String,
                required: false,
                default: ''
            }
        }
    }
</script>