import Cookie from 'js-cookie'
// import router from 'vue-router'
export default {
    state:{
        isCollapse:false,//默认展开
        tabsList:[
            {
                path:'/',
                name:'home',
                label:"首页",
                icon:'home'
            }
        ],
        currentMenu:null,
        menu:[]
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state,value){
            if(value.name !== 'home'){
                state.currentMenu = value
                let result = state.tabsList.findIndex(item => item.name === value.name)
                if(result === -1){
                    state.tabsList.push(value)
                }
            }else{
                state.currentMenu = null
            }
        },
        closeTag(state,value){
            const result = state.tabsList.findIndex(item => item.name === value.name)
            state.tabsList.splice(result,1)
        },
        setMenu(state,value){
            state.menu = value
            Cookie.set('menu',JSON.stringify(value))
        },
        clearMenu(state){
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state,router){
            if(!Cookie.get('menu')){
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item => {
                        item.component = () => import(`../../src/views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component = () => import(`../../src/views/${item.url}`)
                    menuArray.push(item)
                }
            });
            //路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main',item)
            })
        }

    },
}