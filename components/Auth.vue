<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')
const config = useRuntimeConfig()
const sent = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
        email: email.value,
        options: {
          emailRedirectTo: config.public.siteUrl + '/confirm',
        }
    })
    if (error) throw error
    sent.value = true
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="card w-96 bg-neutral shadow-xl mx-auto text-center" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <p class="description">Sign in via magic link below</p>
      <div>
        <input class="input input-bordered w-full max-w-xs" type="email" placeholder="Email" v-model="email" />
      </div>
      <div class="">
        <button
          type="submit"
          class="btn btn-primary m-5"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        >Send magic link</button>
      </div>
    </div>
    <div class="toast toast-top toast-center" v-if="sent">
      <div class="alert alert-info flex">
        <span>Login request sent! Check your email.</span>
      </div>
    </div>
  </form>
</template>
