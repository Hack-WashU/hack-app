<script setup>
import { PhDiscordLogo } from "@phosphor-icons/vue";
</script>
<template>
  <div class="alert shadow-md w-1/3 mb-30">
    <ph-discord-logo :size="40" />
    <div>
      <div class="text-lg font-bold">Join Discord!</div>
      <div class="text-s">This is required for the event.</div>
      <div class="text-xs">
        If you need help during the event, open a ticket in the #event-helpme
        channel
      </div>
    </div>
    <a class="btn btn-warning btn-md" href="https://discord.gg/VZmT3Zzeb2"
      >Discord</a
    >
  </div>
</template>
