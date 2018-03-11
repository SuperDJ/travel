<template>
    <progressive-img
        :src="require(`@/static${src}`).src"
        :placeholder="require(`@/static${src}`).placeholder"
        :alt="alt"
    />
</template>

<script>
    export default
    {
    	props: {
    		src: {
    			type: String,
                required: true,
                default: ''
            },
            alt: {
    			type: String,
                required: false,
                default: '',
            }
        },
    }
</script>