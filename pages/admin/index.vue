<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

let {data} = await supabase.from('profiles').select(`role`).eq('id', user.value.id).single()

if (data) {
    if (data.role !== 'admin') {
        await navigateTo('/account')
    }
}
</script>
<template>
  <div class="flex justify-center">
    <div class="w-1/2">
        <AdminSetKey class="mt-10"/>
        <AdminGenerateLink class="mt-10"/>
    </div>
  </div>
</template>
