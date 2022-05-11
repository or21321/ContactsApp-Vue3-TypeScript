<script setup lang="ts">
import { defineProps, defineEmits, provide, inject } from "vue";
import menuPopup from "./menu-popup.vue";

const contactActions = inject("contactActions");

const props = defineProps({
  contact: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["contactSelect", "contactRemove", "contactEdit"]);
// Those funcs arent needed anymore because i have used provide to save emits & make code safer and more debugabble
// function onContactSelect(id) {
//   emit("contactSelect", id);
// }

// function onEdit() {
//   emit("contactEdit", props.contact._id);
// }

// function onRemove() {
//   emit("contactRemove", props.contact._id);
// }
</script>

<template>
  <li
    class="contact-preview"
    @click="contactActions.onContactSelect(contact._id)"
  >
    <span>{{ contact.name }}</span>
    <span>{{ contact.email }}</span>
    <span>{{ contact.phone }}</span>
    <menu-popup>
      <template #btn>Actions</template>
      <template #header>Actions</template>
      <template #options>
        <li @click.stop="contactActions.onContactEdit(contact._id)">Edit</li>
        <li @click.stop="contactActions.onContactRemove(contact._id)">
          Remove
        </li>
      </template>
    </menu-popup>
  </li>
</template>