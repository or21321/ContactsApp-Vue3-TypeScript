<script setup lang="ts">
import {
  inject,
  onBeforeMount,
  Ref,
  ref,
  watchEffect,
} from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { Contact } from "../models/contact.model";
import { contactService } from "../services/contact.service";

const route = useRoute();
const { id } = route.params;

const prmRes = id
  ? await contactService.getById(id as string)
  : await contactService.getEmptyContact();

const contactToEdit: Ref<Contact> | Ref<undefined> = ref(prmRes);

const onContactsUpdate: Function | undefined = inject("onContactsUpdate");
// const prm = await new Promise((res, rej) => {
//   setTimeout(() => {
//     console.log("2000");
//     res(null);
//   }, 2000);
// });
// watchEffect(async () => {
//   console.log("onBeforeMount() \n route.params", route.params);
//   const { id } = route.params;
//   contactToEdit.value = id
//     ? await contactService.getById(id as string)
//     : contactService.getEmptyContact();
//   console.log("contactToEdit.value", contactToEdit.value);
// });

async function onSubmit() {
  const contactToEditCopy = JSON.parse(JSON.stringify(contactToEdit));
  const savedContact = await contactService.save(
    contactToEdit.value as Contact
  );
  // Need to manually emtit to reload contacts because i dont use store here
  console.log("savedContact", savedContact);
  if (onContactsUpdate instanceof Function) onContactsUpdate();
  if (!contactToEditCopy.value?._id)
    contactToEdit.value = await contactService.getEmptyContact();
}
</script>

<template>
  <!-- <async-modal> -->
  <section v-if="contactToEdit" class="contact-edit">
    <form @submit.prevent="onSubmit" class="edit-form">
      <input type="text" v-model="contactToEdit.name" />
      <input type="text" v-model="contactToEdit.email" />
      <input type="text" v-model="contactToEdit.phone" />
      <button>Add</button>
    </form>
  </section>
  <!-- </async-modal> -->
</template>

<style lang="css">
.contact-edit {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 50px;
  min-height: 50px;
  background-color: red;
}
</style>