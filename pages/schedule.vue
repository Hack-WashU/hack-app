<script setup>
import { PhPhone } from "@phosphor-icons/vue";

const { data } = await useAsyncData("schedule", () =>
  queryContent("/schedule").findOne()
);
</script>

<template>
  <head>
    <title>Hack WashU - Schedule</title>
  </head>
  <div class="flex justify-center">
    <div class="prose prose-lg mt-10 text-center">
      <h1 class="text-center">Event Schedule 📆</h1>
      <p class="text-center">
        This schedule will be updated as the event progresses. Keep an eye on
        Discord!
      </p>
      <div class="alert shadow-lg w-100">
        <ph-phone :size="40" />
        <div>
          <div class="text-md">
            Want text updates? Text "@hwu23" (without the quotes) to 81010!
          </div>
        </div>
      </div>
      <ContentRenderer :value="data" />
    </div>
  </div>
</template>
