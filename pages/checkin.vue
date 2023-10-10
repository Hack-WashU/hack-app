<script setup lang="ts">
import {generate} from 'random-words'

// This is the global checkin variable
// Setting will enable checkins.
const checkin_status = true;

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const { data } = await supabase.from('profiles').select(`checked_in`).eq('id', user.value.id).single()

if (checkin_status && data && !data.checked_in) {
  try {
    const { error: invokeError } = await supabase.functions.invoke('checkin-sheet')
    if (invokeError) throw invokeError

    const words = generate({exactly: 3, join: '-'})
    
    const { error } = await supabase.from('profiles').update({ checked_in: true, secret_key: words }).eq('id', user.value.id)
    if (error) throw error
  } catch (error: any) {
    alert(error.message)
  }
}

await navigateTo('/account')

</script>
<template>
    <div>Check in!</div>
</template>
  