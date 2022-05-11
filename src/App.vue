<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from "./components/HelloWorld.vue"
import homePage from "./pages/homePage.vue";
import contactPage from "./pages/contactPage.vue";
import appHeader from "./components/appHeader.vue";
import { ref } from "@vue/reactivity";
import { provide } from "vue";
import { onBeforeMount } from "@vue/runtime-core";
import { authService } from "./services/auth.service";
import { useRoute, useRouter } from "vue-router";
import { notify } from "@kyvg/vue3-notification";

const loggedUserRef = authService.getLoggedUserRef();

const router = useRouter();
const route = useRoute();

onBeforeMount(() => {
  // getLoggedUser();
  provide("loggedUser", loggedUserRef);
});

// function getLoggedUser() {
//   loggedUser.value = authService.getLoggedUser();
// }

async function logout() {
  await authService.logout();
  notify({
    title: "Logged out",
    text: "You have logged out successfully!",
  });
  if (route.path === "/home") router.push("/login");
}
</script>

<template>
  <app-header class="main-layout" @onLogout="logout"></app-header>
  <router-view class="main-layout" />
  <notifications />
  <!-- <homePage prop1="prop1" /> -->
  <!-- <contact-page></contact-page> -->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
</template>
