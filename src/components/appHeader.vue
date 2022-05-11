<script setup lang="ts">
import { inject } from "@vue/runtime-core";

const emit = defineEmits(["onLogout"]);

const loggedUser = inject("loggedUser");

function logout() {
  emit("onLogout");
}
</script>

<template>
  <section class="app-header-container">
    <header class="app-header">
      <div class="logo">Logo</div>
      <nav class="nav-bar">
        <router-link :to="{ name: 'Home' }">Home</router-link>
        <router-link :to="{ name: 'Contact' }">Contacts</router-link>
        <router-link v-if="!loggedUser" :to="{ name: 'Login' }"
          >Login</router-link
        >
        <button v-else @click="logout">Logout</button>
      </nav>
    </header>
  </section>
</template>