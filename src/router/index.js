import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/home';
import DataReport from '@/views/data_report';

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/data_report/:voice',
      name: 'dataReport',
      component: DataReport
    },
    { 
      path: '*', 
      redirect: '/' 
    }
  ]
})
