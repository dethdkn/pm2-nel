import { VueUiWheel } from 'vue-data-ui'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.component('VueUiWheel', VueUiWheel)
})
