<script setup lang="ts">
import { ref } from "@vue/reactivity";

const isOpen = ref(false);
</script>

<template>
  <section class="menu-popup" @click.stop="isOpen = !isOpen">
    <button class="btn-premium" v-if="!isOpen">
      <slot name="btn"></slot>
    </button>
    <div v-else>
      <header>
        <slot name="header"></slot>
        <button @click.stop="isOpen = !isOpen">X</button>
      </header>
      <ul>
        <slot name="options"></slot>
      </ul>
    </div>
  </section>
</template>