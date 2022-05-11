<script setup lang="ts">
import {
  inject,
  onBeforeMount,
  onMounted,
  provide,
  Ref,
  ref,
} from "@vue/runtime-core";
import { contactService } from "../services/contact.service";
import { Contact, Contacts } from "../models/contact.model";
import contactList from "../components/contactList.vue";
import { useRouter } from "vue-router";

provide("contactActions", { onContactEdit, onContactSelect, onContactRemove });
provide("onContactsUpdate", loadContacts);

const router = useRouter();

const contacts: Ref<Contacts> | Ref<undefined> = ref();

onBeforeMount(async () => {
  loadContacts();
});

async function loadContacts() {
  contacts.value = await contactService.query<Contacts>();
}

function onContactSelect(id: string) {
  router.push("/contact/" + id);
}

function onContactEdit(id: string) {
  console.log("onContactEdit", id);
  router.push("/contact/edit/" + id);
}

function onContactRemove(id: string) {
  console.log("onContactRemove", id);
}

function log(str) {
  console.log(str);
}
</script>

<template>
  <section class="contact-page">
    <button @click="router.push('/contact/edit')">Create a new contact!</button>
    <contact-list
      @contactSelect="onContactSelect"
      @contactEdit="onContactEdit"
      @contactRemove="onContactRemove"
      :contacts="contacts"
    ></contact-list>
    <Suspense @pending="log('Pending')" @resolve="log('Resolve')">
      <router-view></router-view>

      <template #fallback> Loading........................... </template>
    </Suspense>
  </section>
</template>