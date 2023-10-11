<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const role = ref("");
import { PhTwitchLogo } from "@phosphor-icons/vue";
import { PhInstagramLogo } from "@phosphor-icons/vue";

onMounted(async () => {
  if (user.value) {
    let { data } = await supabase
      .from("profiles")
      .select(`role`)
      .eq("id", user.value.id)
      .single();
    if (data) role.value = data.role;
  }
});
</script>
<template>
  <div class="navbar bg-base-300">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><a href="/account">Account</a></li>
          <li><a href="/spaces">Space Information</a></li>
          <li><a href="/schedule">Schedule</a></li>
          <li><a href="/resources">Project Resources</a></li>
          <li><a href="/jobs">Jobs</a></li>
          <li><a href="/faq">FAQ</a></li>

          <li v-if="role === 'admin'">
            <a class="btn btn-primary" href="/admin">Admin Page</a>
          </li>
        </ul>
      </div>
      <a class="btn btn-ghost normal-case text-xl" href="/account"
        >Hack WashU</a
      >
      <div class="end">
        <a
          target="_blank"
          class="mr-2"
          v-if="role !== 'admin'"
          href="https://instagram.com/hackwashu"
          ><ph-instagram-logo :size="32"
        /></a>
        <a
          target="_blank"
          class="mr-2"
          v-if="role !== 'admin'"
          href="https://twitch.tv/hackwashu"
          ><ph-twitch-logo :size="32"
        /></a>
      </div>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/account">Account</a></li>
        <li><a href="/spaces">Space Information</a></li>
        <li><a href="/schedule">Schedule</a></li>
        <li><a href="/resources">Project Resources</a></li>
        <li><a href="/jobs">Jobs</a></li>
        <li><a href="/faq">FAQ</a></li>
      </ul>
    </div>
    <div class="navbar-end hidden lg:flex">
      <a
        target="_blank"
        class="mr-2"
        v-if="role !== 'admin'"
        href="https://instagram.com/hackwashu"
        ><ph-instagram-logo :size="32"
      /></a>
      <a
        target="_blank"
        class="mr-2"
        v-if="role !== 'admin'"
        href="https://twitch.tv/hackwashu"
        ><ph-twitch-logo :size="32"
      /></a>
      <a class="btn btn-primary" v-if="role === 'admin'" href="/admin"
        >Admin Page</a
      >
    </div>
  </div>
</template>

<style>
.end {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
