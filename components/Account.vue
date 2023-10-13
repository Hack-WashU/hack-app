<script setup lang="ts">
const supabase = useSupabaseClient();

const loading = ref(true);
const email = ref("");
const checked_in = ref(false);
const shirt = ref("M");

loading.value = true;
const user = useSupabaseUser();

let { data } = await supabase
  .from("profiles")
  .select(`email, checked_in`)
  .eq("id", user.value.id)
  .single();

if (data) {
  email.value = data.email;
  checked_in.value = data.checked_in;
}

let shirtdata = await supabase
  .from("shirts")
  .select(`shirt`)
  .eq("email", data!.email)
  .single();

if (shirtdata.data) {
  if (
    shirtdata.data.shirt === "XS" ||
    shirtdata.data.shirt === "S" ||
    shirtdata.data.shirt === "M" ||
    shirtdata.data.shirt === "L" ||
    shirtdata.data.shirt === "XL"
  ) {
    shirt.value = shirtdata.data.shirt;
  } else {
    shirt.value = "ERROR";
  }
} else {
  shirt.value = "ERROR";
}

loading.value = false;

async function updateProfile() {
  try {
    loading.value = true;
    const user = useSupabaseUser();

    const updates = {
      updated_at: new Date(),
    };

    let { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.value.id);
    if (error) alert(error.message);
  } catch (error: any) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function signOut() {
  loading.value = true;
  await supabase.auth.signOut();
  user.value = null;
  loading.value = false;
  await navigateTo("/");
}

// Determine card's background color based on shirt size
const determineBackgroundColor = () => {
  if (shirt.value === "XS") {
    return "btn-danger";
  } else if (shirt.value === "S") {
    return "btn-secondary";
  } else if (shirt.value === "M") {
    return "btn-info";
  } else if (shirt.value === "L") {
    return "btn-accent";
  } else if (shirt.value === "XL") {
    return "btn-warning";
  } else {
    return "bg-primary";
  }
};
const staticFormClass =
  "bg-neutral card w-96 shadow-xl mx-auto text-center items-center ";
</script>

<template>
  <form :class="[staticFormClass]" @submit.prevent="updateProfile">
    <div class="form-control">
      <label for="email">Email</label>
      <input id="email" type="text" :value="email" class="input input-bordered w-full max-w-xs" disabled />
    </div>
    <div class="form-control text-center">
      <h4>Shirt Size</h4>
      <h1 :class="determineBackgroundColor()">
        {{ shirt }}
      </h1>
    </div>

    <div class="m-5">
      <button class="btn" :class="determineBackgroundColor()" @click="signOut" :disabled="loading">
        Sign Out
      </button>
    </div>
  </form>
</template>

<style>
h1 {
  color: white !important;
  padding: 5px;
  border-radius: 10px;
  margin-bottom: -10px;
  font-size: 4em;
}
</style>
