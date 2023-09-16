<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

if (!user.value) {
  await navigateTo('/')
}

const checked_in = ref(false)

let { data } = await supabase
  .from('profiles')
  .select(`checked_in`)
  .eq('id', user.value.id)
  .single()

if (data) {
    checked_in.value = data.checked_in
}
</script>

<template>
    <div class="prose prose-lg mt-10 text-center">
        <h1>Account Settings</h1>
        <Account />
        <VerifyInfo v-if="checked_in" class="mt-5" />
        <h2 v-else="checked_in">You are not checked in</h2>
    </div>
</template>
