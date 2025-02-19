import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/home/HomePage.vue'), meta: { title: 'Home' } },
      {
        path: 'timer',
        component: () => import('pages/timer/TimerPage.vue'),
        meta: { title: 'Timer' },
      },
      {
        path: 'current-timer-settings',
        component: () => import('pages/current-timer-settings/CurrentTimerSettingsPage.vue'),
        meta: { title: 'Current Timer Settings' },
      },

      {
        path: 'deparment',
        component: () => import('pages/deparment/DeparmentPage.vue'),
        meta: { title: 'Deparments' },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
