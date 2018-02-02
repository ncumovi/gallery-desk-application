import Vue from 'vue'
import Router from 'vue-router'
import stage from '@/components/stage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'stage',
      component: stage
    }
  ]
})
