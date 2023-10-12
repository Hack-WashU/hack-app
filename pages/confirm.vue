<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

watch(user, async () => {
  if (user.value) {
    return navigateTo('/account')
  }
}, { immediate: true })
</script>

<template>
  <div>Attempting to redirect you! Don't switch away from this page yet.</div>
  <div>If nothing changes, try refreshing.</div>
  <div>If that doesn't work, try clicking <a href="/account">here</a>.</div>
</template>
