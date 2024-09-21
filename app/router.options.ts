/* eslint-disable no-restricted-globals, typescript/no-explicit-any */
import type { RouterConfig } from '@nuxt/schema'

const RouteOptions: RouterConfig = {
  scrollBehavior(to, from, savedPosition){
    const nuxtApp = useNuxtApp()

    if(savedPosition) return new Promise(resolve => nuxtApp.hooks.hookOnce('page:finish', () => {
      setTimeout(() => resolve(savedPosition), 50)
    }))

    if(to.hash){
      setTimeout(() => {
        let heading = document.querySelector(`[id="${to.hash.replace('#', '')}"]`) as any
        if(!heading) heading = document.querySelector(`[href$="${to.hash}"]`) as any
        if(!heading) return
        return window.scrollTo({ top: heading.offsetTop, behavior: 'smooth' })
      })
      return
    }

    if(from.path !== to.path) return window.scrollTo({ top: 0, behavior: 'smooth' })

    return { top: 0 }
  },
}

export default RouteOptions
