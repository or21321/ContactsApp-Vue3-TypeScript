<script setup lang="ts">
import { onMounted, ref, Ref, watch, watchEffect } from "@vue/runtime-core";
import { RouteParams, useRoute, useRouter } from "vue-router";
import { Contact } from "../models/contact.model";
import { contactService } from "../services/contact.service";

const route = useRoute();
const router = useRouter();
const { id } = route.params;
const prmRes = await contactService.getById(id as string);
const contact: Ref<Contact> | Ref<undefined> = ref(prmRes);

function onClickOutside() {
  router.back();
}
</script>

<template>
  <section
    v-click-outside="onClickOutside"
    class="contact-detais wrapped-modal"
  >
    <div>Details</div>
    <div>{{ contact.name }}</div>
  </section>
</template>+