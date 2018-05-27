import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/all',
      name: 'all-page',
      component: require('@/components/pages/DocumentsPage').default
    },
    {
      path: '/downloads',
      name: 'download-page',
      component: require('@/components/pages/DownloadsPage').default
    },
    {
      path: '/completed',
      name: 'archive-page',
      component: require('@/components/pages/ArchivePage').default
    },
    {
      path: '/removed',
      name: 'trash-page',
      component: require('@/components/pages/TrashPage').default
    },
    {
      path: '/add',
      name: 'add-page',
      component: require('@/components/pages/AddTaskPage').default
    },
    {
      path: '/setting',
      name: 'setting-page',
      component: require('@/components/pages/SettingPage').default
    },
    {
      path: '*',
      redirect: '/all'
    }
  ]
})
