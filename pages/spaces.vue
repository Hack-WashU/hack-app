<script setup lang="ts">
let { body } = await queryContent().where({ 'title': 'Spaces' }).findOne()
console.log(body[0].items)
</script>
<template>
  <div class="flex justify-center">
    <div class="prose prose-lg mt-10">
        <h1 class="text-center">Space Information!</h1>
        <div v-for="section in body">
            <div class="collapse bg-base-200 mt-5">
                <input type="checkbox" /> 
                <div class="collapse-title text-xl font-medium">
                    {{ section.name }}
                </div>
                <div class="collapse-content"> 
                    <ul v-for="item in section.info" class="list-disc">
                        <li>{{ item }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>