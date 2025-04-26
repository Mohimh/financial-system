import { createRouter, createWebHashHistory } from "vue-router";

import Layout from '@/views/main.vue'
import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import Department from '@/views/department/index.vue'
import Stuff from '@/views/stuff/index.vue'
import Salary from '@/views/salary/index.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    name: 'main',
    children: [
      {
        path: 'home',
        meta: { id: '0', name: 'logo', path: '/home'},
        component: Home
      },
      {
        path: 'home',
        meta: { id: '1', name: '首页', icon: 'HomeFilled', path: '/home'},
        component: Home
      },
      {
        path: 'department',
        meta: { id: '2', name: '部门信息', icon: 'Postcard', path: '/department'},
        component: Department
      },
      {
        path: 'stuff',
        meta: { id: '3', name: '员工管理', icon: 'User', path: '/stuff'},
        component: Stuff
      },
      {
        path: 'salary',
        meta: { id: '4', name: '工资管理', icon: 'ScaleToOriginal', path: '/salary'},
        component: Salary
      }
    //   {
    //     path: 'auth',
    //     meta: { id: '2' ,name: '权限管理', icon: 'Grid' },
    //     children: [
    //       {
    //         path: '',
    //         alias: ['admin'],
    //         meta: { id: '1', name: '账号管理', icon: 'Avatar', path: '/auth/admin', describe: '管理员可以进行编辑，权限修改后需要登出才会生效' },
    //         component: Admin
    //       },
    //       {
    //         path: 'group',
    //         meta: { id: '2', name: '菜单管理', icon: 'Menu', path: '/auth/group', describe: '菜单规则通常对应一个控制器的方法,同时菜单栏数据也从规则中获取' },
    //         component: Group
    //       }
    //     ]
    //   },
    //   {
    //     path: 'vppz',
    //     meta: { id: '3', name: 'DIDI陪诊', icon: 'BellFilled' },
    //     children: [
    //       {
    //         path: '',
    //         alias: ['staff'],
    //         meta: { id: '1', name: '陪护管理', icon: 'Checked', path: '/vppz/staff', describe: '陪护师可以进行创建和修改，设置对应生效状态控制C端选择' },
    //         component: Staff
    //       },
    //       {
    //         path: 'order',
    //         meta: { id: '2', name: '订单管理', icon: 'List', path: '/vppz/order', describe: 'C端下单后可以查看所有订单状态，已支付的订单可以完成陪护状态修改' },
    //         component: Order
    //       }
    //     ]
    //   }
    ]
  },
  {
    path:'/login',
    component: Login
  }
]

const router = createRouter(
  {
    history: createWebHashHistory(),
    routes
  }
)

export default router