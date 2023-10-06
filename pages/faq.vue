<script setup>
let { body } = await queryContent().where({ title: "Faq" }).findOne();
</script>
<template>
  <div class="flex justify-center">
    <div class="prose prose-lg mt-10">
      <h1 class="text-center">Hack WashU FAQ 🤔❓</h1>
      <p class="text-center">
        If your question is missing, you can message us on
        <a href="https://instagram.com/hackwashu">Instagram</a> or send us an
        email at organizer@hackwashu.com .
      </p>
      <div v-for="section in body">
        <h3 class="text-center">{{ section.Section }}</h3>
        <div
          v-for="question in section.Questions"
          class="collapse bg-base-200 mt-5"
        >
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium">
            {{ question.Question }}
          </div>
          <div class="collapse-content">
            <p>{{ question.Answer }}</p>
          </div>
        </div>
      </div>
      <div class="mb-30"></div>
    </div>
  </div>
</template>
