<template>
  <q-page padding>
    <!-- style="background: transparent" -->
    <!-- text-accent -->
    <q-card class="page-height text-center">
      <!-- <q-card-section class="bg-primary-gradient text-accent">
        <div class="text-h5">{{ title }}</div>
      </q-card-section> -->
      <q-card-section>
        <div class="text-h1">{{ title }}</div>
      </q-card-section>

      <q-card-section>
        <div class="text-h2">{{ homeModel.numRounds }}</div>
      </q-card-section>

      <q-card-section>
        <div class="text-h5">
          <p>Rounds {{ homeModel.lengthRound }}</p>
          <p>Notice {{ homeModel.noticeRound }}</p>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="text-h5">
          <p>Breaks {{ homeModel.lengthBreak }}</p>
          <p>Notice {{ homeModel.noticeBreak }}</p>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="text-h5">
          <p>Time {{ homeModel.totalTime }}</p>
        </div>
      </q-card-section>

      <q-card-section>
        <q-btn
          color="primary"
          text-color="accent"
          label="Start"
          size="xl"
          to="/timer"
          target="_self"
        />
      </q-card-section>

      <!-- <q-card-section> una seccions </q-card-section> -->
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useInit } from './home.composables'

// Router
const route = useRoute()

// Titulo de la "Page"
const title = computed(() => (route.meta.title as string) || 'Box Timer')

/*
 * Vue Reactivity
 */
const { homeModel } = useInit()
</script>
