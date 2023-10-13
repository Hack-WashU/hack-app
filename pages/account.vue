<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";


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

const afterCheckInStarts = computed<boolean>(() => {
  return true;
  const currentTime = dayjs.tz(dayjs(), "America/Chicago");
  const checkinStart = dayjs.tz("2023-10-13 17:00:00", "America/Chicago");
  return currentTime.isAfter(checkinStart);
});

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
    <div v-else class="text-center">
      <h1>You are not checked in</h1>
      <div v-if="afterCheckInStarts">
        <p>Click the button below if you're ready to get your swag.</p>
        <p>If you're not physically present at the event yet, you should <strong class="text-secondary">not</strong> click this button!</p>
        <a v-if="afterCheckInStarts" class="btn btn-warning btn-md mt-5" href="/checkin">Check In</a>
      </div>
      <p v-else>Check will be enabled at 5pm on 10/13!</p> 
    </div>
  </div>
</template>

<style>
h1 {
  font-size: 2em !important;
}
</style>
