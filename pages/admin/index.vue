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
<AdminComponent />
</template>