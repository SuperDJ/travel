<template>
    <Web>
        <div slot="content">
            Dit is een test
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