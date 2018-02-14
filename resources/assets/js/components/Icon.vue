<template>
    <i class="material-icons">{{name}}</i>
</template>

<script>
    export default {
        props: {
            name: {
            	type: String,
				required: true,
				default: function(value) {
					return value.replace(' ', '_')
                }
			}
        }
    }
</script>