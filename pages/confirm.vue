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
  <div>Waiting for login... If nothing changes, try refreshing the page</div>
</template>
