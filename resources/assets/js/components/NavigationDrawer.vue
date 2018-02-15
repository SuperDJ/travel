<template>
    <nav class="drawer">
        <div class="drawer-header">
            <slot name="header"/>
        </div>

        <slot name="content"/>
    </nav>
</template>

<script>
    export default {
    }
</script>
