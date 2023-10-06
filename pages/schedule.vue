<script setup>
const { data } = await useAsyncData("schedule", () =>
  queryContent("/schedule").findOne()
);
</script>

<template>
  <div class="flex justify-center">
    <div class="prose prose-lg mt-10 text-center">
      <h1 class="text-center">Event Schedule 📆</h1>
      <p class="text-center">
        This schedule will be updated as the event progresses. Please keep an
        eye out on discord and text "@HWU23" to 81010 for push notifications
        whenever there is an update
      </p>
      <ContentRenderer :value="data" />
    </div>
  </div>
</template>
