<script setup>
import {PhDiscordLogo} from '@phosphor-icons/vue'

const supabase = useSupabaseClient();
const user = useSupabaseUser()

let {data} = await supabase
    .from('profiles')
    .select(`email, secret_key`)
    .eq('id', user.value.id)
    .single()
</script>
<template>
  <div class="alert shadow-lg w-2/3">
    <ph-discord-logo :size="40"/>
        <div>
          <div class="text-lg font-bold">Join Discord! Run the following command in #verify to get verified.</div>
          <div class="text-xs italic">/verify {{ data.email }} {{ data.secret_key }}</div>
          <div class="text-xs">Note: Discord doesn't like people copy/pasting commands. You'll need to type it out from
            scratch (sorry)
          </div>
        </div>
    <a class="btn btn-warning btn-sm" href="https://discord.gg/VZmT3Zzeb2">Discord</a>
</div></template>