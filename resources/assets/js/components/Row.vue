<template>
    <div class="row"><slot/></div>
</template>

<script>
    export default
    {
    	props: {
    		tag: {
    			type: String,
                default: 'div'
            }
        },
        render(h) {
    	    return h(this.tag);
        }
    }
</script>