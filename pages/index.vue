<script setup lang="ts">
const user = useSupabaseUser();

if (user.value) {
  await navigateTo("/account");
}
console.log(useRuntimeConfig().public.siteUrl);
</script>
<template>
  <head>
    <title>Hack WashU - Check-In</title>
  </head>
  <div class="flex justify-center">
    <div class="prose prose-lg mt-10 text-center">
      <h1>Hack WashU Check-In 💻</h1>
      <Auth />
    </div>
  </div>
</template>
