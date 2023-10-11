<script setup>
let { body } = await queryContent().where({ title: "Jobs" }).findOne();
</script>
<template>
  <head>
    <title>Hack WashU - Jobs</title>
  </head>
  <div class="flex justify-center">
    <div class="prose prose-lg mt-10">
      <h1 class="text-center">Sponsor Job Postings 👩‍💻</h1>
      <p class="text-center">
        This page contains open positions our hackathon sponsors are actively
        recruiting for right now
      </p>
      <div v-for="section in body">
        <h3 class="text-center">{{ section.Section }}</h3>
        <div v-for="jobs in section.Jobs" class="collapse bg-base-200 mt-5">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium">
            {{ jobs.Name }}
          </div>
          <div class="collapse-content">
            <div v-for="links in jobs.Links">
              <a v-bind:href="links.Link" target="_blank">{{ links.Name }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-40"></div>
    </div>
  </div>
</template>
