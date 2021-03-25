import Vue from 'vue'
import Router from 'vue-router'
import Oauth from '../components/Oauth'
import Test from "../components/Test";
import BigData from "../components/BigData";
import Device from "../components/Device";
import Mine from "../components/Mine";
import WorkStation from "../components/WorkStation";

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/test',
      name: 'Test',
      component: Test,
      children: [
        {
          path: '/work',
          name: 'Work',
          component: resolve => require(['../components/WorkStation.vue'], resolve)
        },
        {
          path: '/mine',
          name: 'Mine',
          component: resolve => require(['../components/Mine.vue'], resolve)
        },
        {
          path: '/device',
          name: 'Device',
          component: resolve => require(['../components/Device.vue'], resolve)
        },
        {
          path: '/historydata',
          name: 'HistoryData',
          component: resolve => require(['../components/HistoryData.vue'], resolve)
        }
      ],
      meta: {
        title: '',
        keepAlive:true

      }
    },

    {
      path: '/',
      name: 'oauth',
      component: Oauth
    },
    {
      path: '/work',
      name: 'work',
      component: WorkStation
    },

  ],
  mode:'history'
})
