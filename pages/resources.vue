<script setup>
const { data } = await useAsyncData("resources", () =>
  queryContent("/resources").findOne()
);
</script>

<template>
  <div class="flex justify-center">
    <div class="prose prose-lg mt-10 text-center">
      <h1 class="text-center">Project Resources 💻</h1>
      <p class="text-center">
        If you are using another resource and think it could be shared with
        other hackers, please email us at organizer@hackwashu.com and we'll add
        it
      </p>
      <ContentRenderer :value="data" />
    </div>
  </div>
</template>
