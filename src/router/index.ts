import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../components/ListView.vue'
import AddList from '../components/AddList.vue'
import ViewList from '../components/ViewList.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: ListView
    },
    {
      path: '/add',
      name: 'addList',
      component:AddList
    },
    {
      path: '/view/:id?',
      name: 'viewStudent',
      component: ViewList
    },
          
  ]
})

export default router
