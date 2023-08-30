<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

watch(user, async () => {
  if (user.value) {
    let {data, error} = await supabase.from('profiles').select(`checked_in`).eq('id', user.value.id).single()
    if(data && !data.checked_in) {
      return navigateTo('/checkin')
    }
    return navigateTo('/account')
  }
}, { immediate: true })
</script>

<template>
  <div>Waiting for login...</div>
</template>
