<script setup lang="ts">
import { useSessionStorage } from '@vueuse/core'
// Save supabase admin key in state
const key = useSessionStorage('admin', () => '')

</script>
<template>
    <div class="card collapse bg-neutral shadow-xl mx-auto text-center">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
            Set Admin Key (SECRET)
        </div>
        <div class="collapse-content">
            <div class="form-control items-center">
                <label for="email">Supabase Service Key (KEEP THIS SECRET)</label>
                <input id="email" type="text" v-model="key" class="input input-borsdered w-full max-w-xs" />
            </div>
        </div>
    </div>
</template>