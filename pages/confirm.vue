<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

watch(user, async () => {
  if (user.value) {
    let {data} = await supabase.from('profiles').select(`checked_in`).eq('id', user.value.id).single()
    if(data && !data.checked_in) {
      return navigateTo('/checkin')
    }
    return navigateTo('/account')
  }
}, { immediate: true })
</script>

<template>
  <div>Attempting to redirect you! Don't switch away from this page yet.</div>
  <div>If nothing changes, try refreshing.</div>
  <div>If that doesn't work, try clicking <a href="/account">here</a>.</div>
</template>
