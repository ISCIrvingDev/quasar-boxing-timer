<template>
  <!-- <q-page class="row items-center justify-evenly">
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page> -->

  <q-page padding>
    <q-card class="page-height">
      <q-card-section class="bg-primary-gradient text-accent">
        <div class="text-h5">{{ title }}</div>
      </q-card-section>

      <q-card-section>
        <q-btn color="secondary" text-color="secondary" outline label="Add Record" />
      </q-card-section>

      <q-card-section> una seccions </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Router
const route = useRoute()

// Titulo de la "Page"
const title = computed(() => (route.meta.title as string) || 'Box Timer')

// import { ref } from 'vue'
// import type { Todo, Meta } from 'components/models';
// import ExampleComponent from 'components/ExampleComponent.vue';

// const todos = ref<Todo[]>([
//   {
//     id: 1,
//     content: 'ct1'
//   },
//   {
//     id: 2,
//     content: 'ct2'
//   },
//   {
//     id: 3,
//     content: 'ct3'
//   },
//   {
//     id: 4,
//     content: 'ct4'
//   },
//   {
//     id: 5,
//     content: 'ct5'
//   }
// ]);

// const meta = ref<Meta>({
//   totalCount: 1200
// });
</script>
