<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'

const runtimeConfig = useRuntimeConfig()

const serviceKey = ref('')
const signupEmail = ref('')

async function sendSignupLink() {
  try {
    const supabase = createClient(runtimeConfig.public.supabase.url, serviceKey.value, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    // For reach email in the list, send an invite
    var emails = signupEmail.value.split('\n')
    for (var i = 0; i < emails.length; i++) {
      const { data, error } = await supabase.auth.admin.inviteUserByEmail(emails[i])
    }
    alert("Success")
  } catch (error) {
    alert(error.message)
  }
}
</script>

<template>
  <form class="card w-1/2 bg-neutral shadow-xl mx-auto text-center items-center" @submit.prevent="updateProfile">
    <div class="form-control">
      <label for="email">Supabase Service Key (KEEP THIS SECRET)</label>
      <input id="email" type="text" v-model="serviceKey" class="input input-borsdered w-full max-w-xs" />
    </div>
    <div class="form-control">
      <label for="email">Emails to sign up (newline separated)</label>
      <textarea class="textarea textarea-primary" v-model="signupEmail" placeholder="Emails"></textarea>
    </div>

    <div class="m-5">
      <button class="btn btn-secondary" @click="sendSignupLink" :disabled="loading">Generate Email</button>
    </div>
  </form>
</template>
