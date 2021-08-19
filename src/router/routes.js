
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'ARK notes', component: () => import('pages/Index.vue') },
      { path: 'notes/:map', name: 'Notes', component: () => import('pages/Notes.vue') },
      { path: 'todo', name: 'To do', component: () => import('pages/ToDo.vue') },
      { path: 'grinder', name: 'Grinder calc', component: () => import('pages/SPlusGrinder.vue') },
      { path: 'dinotaming', name: 'Dino taming', component: () => import('pages/DinoTaming.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
