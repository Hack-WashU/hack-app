<script setup lang="ts">
const user = useSupabaseUser()

if (user.value) {
    await navigateTo('/account')
}

</script>
<template>
    <div class="prose prose-lg mt-10">
        <h1>Confirm your email</h1>
        <Auth />
    </div>
</template>