import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/home';
import DataReport from '@/views/data_report';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/data_report',
      name: 'DataReport',
      component: DataReport
    },
    { 
      path: '*', 
      redirect: '/' 
    }
  ]
})
