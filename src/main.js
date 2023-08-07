import Vue from 'vue';
import App from './App.vue';
//加载路由插件
import router from './router';
//加载ElementUI框架
import ElementUI from 'element-ui';
//加载国际化插件
import VueI18n from 'vue-i18n';
import { messages } from './utils/i18n';
//加载默认主题
import 'element-ui/lib/theme-chalk/index.css'; 
//加载图标样式
import './assets/css/icon.css';
import './assets/css/Icon-css/iconfont.css'
//加载拖拽组件
import './utils/directives';
//加载语法编辑器
import 'babel-polyfill';

Vue.config.productionTip = false;
//引入国际化插件
Vue.use(VueI18n);
//引入ElementUI框架
Vue.use(ElementUI, {
    size: 'small'
});
//实例化国际化插件
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
// to => route : 即将进入的目标路由对象
// from => route : 当前导航正要离开的路由
// next => function： 一定要调用该方法来 resolve这个钩子，执行效果以来 next 方法的调用参数
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue2-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'coder' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

//挂载插件
new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
