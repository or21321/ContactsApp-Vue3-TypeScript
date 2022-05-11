<script setup lang="ts">
import { defineProps, onMounted, defineEmits } from "vue";
import { useRouter } from "vue-router";
import contactPreview from "./contactPreview.vue";

const router = useRouter();
const emit = defineEmits(["contactSelect", "contactRemove", "contactEdit"]);
const props = defineProps({
  contacts: Array,
});

// Arent needed when using provide
// function onContactSelect(id) {
//   emit("contactSelect", id);
// }

// function onContactEdit(id) {
//   emit("contactEdit", id);
// }

// function onContactRemove(id) {
//   emit("contactRemove", id);
// }
</script>

<template>
  <ul class="contact-list">
    <!-- @contactSelect="onContactSelect"
      @contactEdit="onContactEdit"
      @contactRemove="onContactRemove" -->
    <contactPreview
      :contact="contact"
      :key="contact._id"
      v-for="contact in contacts"
    />
  </ul>
</template>