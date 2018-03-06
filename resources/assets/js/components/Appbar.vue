<template>
    <header class="appbar">
        <Icon name="menu" class="trigger" :data-trigger="drawerId"/>

        <div class="appbar-title">
            <h1>{{title}}</h1>
        </div>

        <div class="appbar-spacer"/>

        <slot/>
    </header>
</template>

<script>
    export default
    {
    	props: {
    		title: {
                type: String,
                required: true,
                default: ''
            },
			drawerId: {
				type: String,
				required: true,
				default: ''
			}
        }
    }
</script>