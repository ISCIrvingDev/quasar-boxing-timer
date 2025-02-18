import { defineBoot } from '#q-app/wrappers'
import { Notify } from 'quasar'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot((/*{ app }*/) => {
  // something to do
  /*
   * Notify
   */
  Notify.registerType('timer-info', {
    progress: true,
    color: 'secondary',
    textColor: 'accent',
  })
})
