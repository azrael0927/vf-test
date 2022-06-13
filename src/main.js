import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

import App from './App.vue';
import router from './router';
import { currency } from './methods/filter';
import $httpMessageState from './methods/pushMessageState';

const app = createApp(App);
app.config.globalProperties.$filters = { currency };
app.config.globalProperties.$httpMessageState = $httpMessageState;
app.use(router);
app.use(VueAxios, axios);
app.component('LoadingEffect', Loading);
app.mount('#app');
