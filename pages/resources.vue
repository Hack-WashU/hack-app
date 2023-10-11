<script setup>
let { body } = await queryContent().where({ title: "Resources" }).findOne();
</script>
<template>
  <div class="flex justify-center">
    <div class="prose prose-lg mt-10">
      <h1 class="text-center">Project Resources 💻</h1>
      <p class="text-center">
        If you are using another resources and think it could be shared with
        other hackers, please email us at organizer@hackwashu.com and we'll add
        it here
      </p>
      <div v-for="section in body">
        <h3 class="text-center">{{ section.Section }}</h3>
        <div
          v-for="resource in section.Resources"
          class="collapse bg-base-200 mt-5"
        >
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium">
            {{ resource.Name }}
          </div>
          <div class="collapse-content">
            <a v-bind:href="resource.Link" target="_blank">{{
              resource.Description
            }}</a>
          </div>
        </div>
      </div>
      <h2 class="text-center">To be completed</h2>
      <div class="mb-40"></div>
    </div>
  </div>
</template>
