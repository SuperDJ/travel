<template>
    <Web>
        <div slot="content">
            <img src="@/static/leonard-cotte-300248-unsplash.jpg">
        </div>
    </Web>
</template>

<script>
    import Web from '@/layouts/Web';

    export default {
    	components: {
    		'Web': Web
        },

        data() {
    		return {
    			image: ''
            }
        }
    }
</script>