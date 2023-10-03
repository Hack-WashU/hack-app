<script setup lang="ts">
const supabase = useSupabaseClient()

const loading = ref(true)

const email = ref('')
const checked_in = ref(false)
const shirt = ref('')

loading.value = true
const user = useSupabaseUser()

let { data } = await supabase
  .from('profiles')
  .select(`email, checked_in`)
  .eq('id', user.value.id)
  .single()

console.log(data)

if (data) {
  email.value = data.email
  checked_in.value = data.checked_in
}

let shirtdata = await supabase
  .from('shirts')
  .select(`shirt`)
  .eq('email', data!.email)
  .single()

console.log(shirtdata.data)

if (shirtdata.data) {
  shirt.value = shirtdata.data.shirt
} else {
  shirt.value = 'No shirt data'
}

loading.value = false

async function updateProfile() {
  try {
    loading.value = true
    const user = useSupabaseUser()

    const updates = {
      updated_at: new Date(),
    }

    let { error } = await supabase.from('profiles').update(updates).eq('id', user.value.id)
    if (error) alert(error.message)
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
  <form class="card w-96 bg-neutral shadow-xl mx-auto text-center items-center" @submit.prevent="updateProfile">
    <div class="form-control">
      <label for="email">Email</label>
      <input id="email" type="text" :value="email" class="input input-bordered w-full max-w-xs" disabled />
    </div>
    <div class="form-control">
      <label for="shirt">Shirt Size</label>
      <input id="shirt" type="text" :value="shirt" class="input input-bordered w-full max-w-xs" disabled />
    </div>

    <div class="m-5">
      <button class="btn btn-secondary" @click="signOut" :disabled="loading">Sign Out</button>
    </div>
  </form>
</template>
