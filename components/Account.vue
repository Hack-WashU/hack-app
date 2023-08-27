<script setup lang="ts">
const supabase = useSupabaseClient()

const loading = ref(true)

const username = ref('')
const email = ref('')
const website = ref(null)
const avatar_path = ref('')

loading.value = true
const user = useSupabaseUser()

if (!user.value) {
  await navigateTo('/')
}

let { data } = await supabase
  .from('profiles')
  .select(`username, website, avatar_url, email`)
  .eq('id', user.value.id)
  .single()

if (data) {
  username.value = data.username
  website.value = data.website
  avatar_path.value = data.avatar_url
  email.value = data.email
}

loading.value = false

async function updateProfile() {
  try {
    loading.value = true
    const user = useSupabaseUser()

    const updates = {
      username: username.value,
      website: website.value,
      avatar_url: avatar_path.value,
      updated_at: new Date(),
    }

    let { error } = await supabase.from('profiles').update(updates).eq('id', user.value.id)
    if (error) throw error
  } catch (error: any) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  loading.value = true
  await supabase.auth.signOut()
  user.value = null
  loading.value = false
  await navigateTo('/')
}

</script>

<template>
  <form class="card w-96 bg-neutral shadow-xl mx-auto text-center" @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="email" disabled />
    </div>
    <div>
      <label for="username">Username</label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" type="url" v-model="website" />
    </div>

    <div>
      <button
        type="submit"
        class="btn btn-primary"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      >Update</button>
    </div>

    <div>
      <button class="btn btn-secondary" @click="signOut" :disabled="loading">Sign Out</button>
      <qrcode-vue :value="value" :level="level" :render-as="renderAs" />
    </div>
  </form>
</template>