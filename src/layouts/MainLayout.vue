<template>
  <q-layout view="hHh lpR lFf">
    <!-- <q-img
      src="background2.jpg"
      :ratio="16 / 9"
      spinner-color="primary"
      spinner-size="82px"
      class="fit absolute"
    /> -->

    <q-header elevated class="bg-primary-gradient text-accent">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>

          Box Timer
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <q-list>
        <q-item-label header>
          <div class="text-h4 text-center">Menu</div>
        </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <q-footer reveal elevated class="bg-primary-gradient text-accent">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>

          Box Timer
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EssentialLink, { type EssentialLinkProps } from './components/EssentialLink.vue'

const leftDrawerOpen = ref(false)
const linksList: EssentialLinkProps[] = [
  {
    title: 'Timer Routines',
    // caption: 'quasar.dev',
    icon: 'timer',
    // icon: 'timer_10_alt_1',
    link: '/timer-routines',
  },
  {
    title: 'Settings',
    // caption: 'github.com/quasarframework',
    icon: 'settings',
    // icon: 'settings_applications',
    link: '/settings',
  },
  {
    title: 'About',
    icon: 'info',
    link: '/about',
  },
]

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
