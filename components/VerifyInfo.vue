<script setup>
import { PhDiscordLogo } from '@phosphor-icons/vue'

</script>
<template>
    <div class="alert shadow-lg w-2/3">
        <ph-discord-logo :size="40" />
        <div>
            <div class="text-lg font-bold">Join Discord! This is required for the event</div>
            <div class="text-xs">If you need help during the event, open a ticket in the #event-helpme channel</div>
        </div>
        <a class="btn btn-warning btn-sm" href="https://discord.gg/VZmT3Zzeb2">Discord</a>
    </div>
</template>
