<script setup lang="ts">
// <script setup> is a compile-time syntactic sugar for using Composition API inside Single File Components (SFCs).
//  It is the recommended syntax if you are using both SFCs and Composition API. It provides a number of advantages over the normal <script> syntax:
// More succinct code with less boilerplate
// Ability to declare props and emitted events using pure TypeScript
// Better runtime performance (the template is compiled into a render function in the same scope, without an intermediate proxy)
// Better IDE type-inference performance (less work for the language server to extract types from code)
import { reactive, ref } from "@vue/reactivity";
import { inject, onMounted, watch, watchEffect } from "@vue/runtime-core";

const props = defineProps({
  prop1: String,
});

const loggedUser = inject("loggedUser");

onMounted(() => {
  console.log("onMounted() loggedUser", loggedUser);
});

// ref returns a ref to a reactive and mutatable object, template and inside proxy the ref gets unwrapped (value.x) by default
const x = ref(0);
// reactive returns a proxy of the object,The Proxy object allows you to create an object that
// can be used in place of the original object, but which may redefine fundamental Object
// operations like getting, setting, and defining properties.
// In this case the proxy is deeply reactive within all its properies.
const proxy = reactive({ x });
// watchEffect will trigger on decalre, watch will trigger only on dependency change + watch allows you
// to have access to oldVal & newVal, watch also allows you to be more specific about what state should trigger the watcher to re-run
// i.e have a dependency array.
// watchEffect((onCleanUp) => {
//   console.log("watchEffect()", x.value);
// });

// watch(proxy, (newVal, oldVal, onCleanUp) => {
//   console.log("watch proxy oldVal", oldVal);
//   console.log("watch proxy newVal", newVal);
// });

// watch(
//   () => proxy.x,
//   (newVal, oldVal, onCleanUp) => {
//     console.log("watch getter oldVal", oldVal);
//     console.log("watch getter newVal", newVal);
//   }
// );

// watch(x, (newVal, oldVal, onCleanUp) => {
//   console.log("watch ref oldVal", oldVal);
//   console.log("watch ref newVal", newVal);
// });
</script>
<script lang="ts">
// This shows that you can have 1 script setup and 1 script at most in each SFC (Single File Component)
const y = "Y";
</script>
<template>
  <section class="home-page">
    <!-- <button @click="x = x + 1">{{ proxy.x }}</button>
    <div>{{ y }}</div>
    <div>{{ props }}</div> -->
    {{ loggedUser }}
  </section>
</template>