import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import ('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import ('@/views/dashboard/index'),
                meta: {
                    title: '系统首页',
                    icon: 'el-icon-s-home'
                }
            }
        ]
    },

    {
        path: '/inend',
        component: Layout,
        redirect: '/inend',
        children: [
            {
                path: '',
                name: 'InEnd',
                component: () => import ('@/views/inend/index'),
                meta: {
                    title: '资源管理',
                    icon: 'el-icon-s-unfold'
                }
            }
        ]
    }, {
        path: '/outend',
        component: Layout,
        redirect: '/outend',
        children: [
            {
                path: 'outend',
                name: 'OutEnd',
                component: () => import ('@/views/outend/index'),
                meta: {
                    title: '规则管理',
                    icon: 'el-icon-s-grid'
                }
            }
        ]
    }, {
        path: '/target',
        component: Layout,
        redirect: '/target',
        children: [
            {
                path: 'target',
                name: 'Target',
                component: () => import ('@/views/target/index'),
                meta: {
                    title: '目标管理',
                    icon: 'el-icon-files'
                }
            }
        ]
    }, {
        path: '/plugin',
        component: Layout,
        redirect: '/plugin',
        children: [
            {
                path: 'plugin',
                name: 'Plugin',
                component: () => import ('@/views/plugin/index'),
                meta: {
                    title: '插件管理',
                    icon: 'el-icon-set-up'
                }
            }
        ]
    }, {
        path: '/driver',
        component: Layout,
        redirect: '/driver',
        children: [
            {
                path: 'driver',
                name: 'Driver',
                component: () => import ('@/views/driver/index'),
                meta: {
                    title: '驱动管理',
                    icon: 'el-icon-orange'
                }
            }
        ]
    }, {
        path: '/log',
        component: Layout,
        redirect: '/log',
        children: [
            {
                path: 'log',
                name: 'Log',
                component: () => import ('@/views/log/index'),
                meta: {
                    title: '日志管理',
                    icon: 'el-icon-postcard'
                }
            }
        ]
    },

    // 404 page must be placed at the end !!!
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

const createRouter = () => new Router({ // mode: 'history', // require service support
    scrollBehavior: () => (
        {y: 0}
    ),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
