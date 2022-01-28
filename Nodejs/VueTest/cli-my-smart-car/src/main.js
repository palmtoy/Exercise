import Vue from 'vue';
import { Button, Space } from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Space);
Vue.use(VueAxios, axios);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
