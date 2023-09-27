<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

if (!user.value) {
  await navigateTo('/')
}

const checked_in = ref(false)

let {data} = await supabase
    .from('profiles')
    .select(`checked_in`)
    .eq('id', user.value.id)
    .single()

if (data) {
  checked_in.value = data.checked_in
}
</script>

<template>
  <div class="flex justify-center">
    <div class="prose prose-lg mt-10 justify-center text-center">
      <h1>Account Settings</h1>
      <Account/>
    </div>
  </div>
  <div class="flex justify-center">
    <VerifyInfo v-if="checked_in" class="justify-center mt-5"/>
    <h2 v-else>You are not checked in</h2>
  </div>

</template>
