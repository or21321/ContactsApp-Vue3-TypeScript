<script setup lang="ts">
import contactEdit from "./contactEdit.vue";
import contactDetails from "./contactDetails.vue";
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import loader from "./loader.vue";

const route = useRoute();
const regex = new RegExp("edit", "i");

const cmp = computed(() => {
  return regex.test(route.path) ? contactEdit : contactDetails;
});
</script>

<template>

    <section class="modal-wrapper">
      <Suspense>
        <component :is="cmp"></component>

        <template #fallback>
          <loader />
        </template>
      </Suspense>
    </section>

</template>
