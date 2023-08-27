<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
        email: email.value,
        options: {
        emailRedirectTo: 'http://localhost:3000/confirm',
        }
    })
    if (error) throw error
    alert('Check your email for the login link!')
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
      <p class="description">Sign in via magic link with your email below</p>
      <div>
        <input class="input input-bordered w-full max-w-xs" type="email" placeholder="Your email" v-model="email" />
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
  </form>
</template>