<script setup lang="ts">
const user = useSupabaseUser();

if (user.value) {
  await navigateTo("/account");
}
console.log(useRuntimeConfig().public.siteUrl);
</script>
<template>
  <div class="flex justify-center">
    <div class="prose prose-lg mt-10 text-center">
      <h1>Hack WashU Check-In 💻</h1>
      <Auth />
      <h2>Important Links to check out</h2>
      <p class="font-bold"><a href="/faq">FAQ!</a></p>
      <p class="font-bold"><a href="/schedule">Event Schedule</a></p>
      <p class="font-bold"><a href="/resources">Project Resources</a></p>
    </div>
  </div>
</template>
