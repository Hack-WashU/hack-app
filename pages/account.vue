<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

if (!user.value) {
  await navigateTo("/");
}

const checked_in = ref(false);

let { data } = await supabase
  .from("profiles")
  .select(`checked_in`)
  .eq("id", user.value.id)
  .single();

if (data) {
  checked_in.value = data.checked_in;
}

console.log("TODO: Build an easter egg.");
console.log(`
     .-.            .-.
    /   \\          /   \\
   |   _ \\        / _   |
   ;  | \\ \\      / / |  ;
    \\  \\ \\ \\_.._/ / /  /
     \'. \'.;\'    \';,\' .\'
       \'./ _    _ \\.\'
       .\'  a __ a  \'.
  \'--./ _,   \\/   ,_ \\.--\'
 ----|   \\   /\\   /   |----
  .--\'\\   \'-\'  \'-\'    /\'--.
      _>.__  -- _.-  \`;
    .\' _     __/     _/
   /    \'.,:\".-\\    /:,
   |      \\.\'   \`\"\"\`\'.\\\\
    \'-,.__/  _   .-.  ;|_
    /\` \`|| _/ \`\\/_  \\_|| \`\\
   |    ||/ \\-./\` \\ / ||   |
    \\   ||__/__|___|__||  /
     \\_ |_Happy Easter_| /
    .\'  \\ =  _= _ = _= /\`\\
   /     \`-;----=--;--\'   \\
   \\    _.-\'        \'.    /
    \`\"\"\`              \`\"\"\`
`);
</script>

<template>
  <div class="flex justify-center">
    <div class="prose prose-lg mt-10 justify-center text-center">
      <Countdown />
      <h1>Account Information</h1>
      <Account />
    </div>
  </div>
  <div v-if="checked_in" class="flex justify-center mt-5">
    <h1>You're checked in!</h1>
  </div>
  <div class="flex justify-center">
    <VerifyInfo v-if="checked_in" class="justify-center mt-5" />
    <h1 v-else>You are not checked in</h1>
  </div>
</template>
