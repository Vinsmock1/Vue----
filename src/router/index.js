import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            name:'Main',
            component:() => import('../views/Main'),
            children:[
                // {
                //     path:'/home',
                //     name:'home',
                //     component:() => import('../pages/home')
                // },
                // {
                //     path:'/user',
                //     name:'user',
                //     component:() => import('../pages/user')
                // },
                // {
                //     path:'/mall',
                //     name:'mall',
                //     component:() => import('../pages/mall')
                // },
                // {
                //     path:'/page1',
                //     name:'page1',
                //     component:() => import('../pages/other/pageOne')
                // },
                // {
                //     path:'/page2',
                //     name:'page2',
                //     component:() => import('../pages/other/pageTwo')
                // },
            ],
        },
        {
            path:'/login',
            name:'login',
            component:() => import('../views/login/login')
        }
    ]
})
const originalPush = VueRouter.prototype.push

//解决报错信息：NavigationDuplicated: Avoided redundant navigation to current location
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}