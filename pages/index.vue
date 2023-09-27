<script setup lang="ts">
const user = useSupabaseUser()

if (user.value) {
    await navigateTo('/account')
}
console.log(useRuntimeConfig().public.siteUrl)
</script>
<template>
  <div class="flex justify-center">
    <div class="prose prose-lg mt-10 text-center">
        <h1>Hack WashU Check-In 💻</h1>
        <Auth />
        <p class="font-bold">Check out our <a href="/faq">FAQ!</a></p>
    </div>
  </div>
</template>
