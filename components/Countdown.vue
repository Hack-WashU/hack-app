<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const endTime = dayjs.tz("2024-10-20 13:00:00", "America/Chicago");
const timeLeft = ref<number>(0);

const formattedTime = computed(() => {
  const d = dayjs.duration(timeLeft.value);
  return `${d.hours()}h ${d.minutes()}m ${d.seconds()}s`;
});

const updateTimer = () => {
  timeLeft.value = endTime.diff(dayjs());
  if (timeLeft.value <= 0) {
    clearInterval(interval);
  }
};

let interval = setInterval(updateTimer, 1000);

onBeforeUnmount(() => {
  clearInterval(interval);
});

const afterHackathonStart = computed<boolean>(() => {
  const currentTime = dayjs.tz(dayjs(), "America/Chicago");
  const hackathonStart = dayjs.tz("2024-10-19 17:00:00", "America/Chicago");
  return currentTime.isAfter(hackathonStart);
});
</script>

<template>
  <div v-if="afterHackathonStart && timeLeft > 0" class="text-center p-4">
    <div class="text-xl font-bold">Time left: {{ formattedTime }}</div>
  </div>
</template>
