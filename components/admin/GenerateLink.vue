<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
import { useSessionStorage } from '@vueuse/core'

const runtimeConfig = useRuntimeConfig()

const serviceKey = useSessionStorage('admin', () => '')
const signupEmail = ref('')

async function sendSignupLink() {
  try {
    if (serviceKey.value === '')
      throw new Error("No service key")

    const supabase = createClient(runtimeConfig.public.supabase.url, serviceKey.value, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    // For reach email in the list, send an invite
    var emails = signupEmail.value.split('\n')
    for (var i = 0; i < emails.length; i++) {
      const { data } = await supabase.auth.admin.inviteUserByEmail(emails[i])
    }
    alert("Success")
  } catch (error: any) {
    alert(error.message)
  }
}
</script>

<template>
  <form class="card collapse bg-neutral shadow-xl text-center" @submit.prevent="sendSignupLink">
    <input type="checkbox" />
    <div class="collapse-title text-xl font-medium">
      Generate Link
    </div>
    <div class="collapse-content items-center">
      <div class="form-control">
        Service Key Required
        <label for="email">Emails to sign up (newline separated)</label>
        <textarea class="textarea textarea-primary" v-model="signupEmail" placeholder="Emails"></textarea>
      </div>
      <div class="m-5">
        <button class="btn btn-secondary" type="submit">Generate Email</button>
      </div>
    </div>
  </form>
</template>
