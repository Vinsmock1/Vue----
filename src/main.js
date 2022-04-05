import Vue from 'vue'
import App from './App.vue'
import router from'./router'
import store from './store'
import './assets/less/index.less'
import axios from 'axios'
import '../src/api/mock'
import { Container,Aside,Header,Main,Button,Radio
  ,Menu,Submenu,MenuItemGroup,MenuItem,DropdownItem,Dropdown,
  DropdownMenu,Row,Col,Card,Table,TableColumn,Breadcrumb,BreadcrumbItem,
  Tag,Form,FormItem,Input,Select,Switch,
  DatePicker,Option,Dialog,Pagination,MessageBox,Message
} from 'element-ui';

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Button)
Vue.use(Radio)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(DropdownItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(MessageBox)
Vue.use(Message)

//路由守卫,没有登陆产生token 就指向login页面
router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  const token = store.state.user.token
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else if(token && to.name === 'login'){
    next({name:'home'})
  }else{
    next()
  }
})
new Vue({
  render: h => h(App),
  router,
  store,
  created(){//避免刷新动态路由失效
    store.commit('addMenu',router)
  }
}).$mount('#app')
