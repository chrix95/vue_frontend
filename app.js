window._ = require('lodash');
window.Popper = require('popper.js').default;

try {
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {
    console.log(`jQuery or bootstrap is not loaded! ${e.message}`);
}

const axios = require('axios');
const config = {
    'Bearer': localStorage.getItem('token')
};
window.axios = axios(config);
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Vue = require('vue');
window.Noty = require('noty');
window.host = 'http://bucketlistapi/api/v1';

Vue.component('Welcome', require('./components/WelcomeComponent.vue').default);
Vue.component('Navbar', require('./components/NavComponent.vue').default);
Vue.component('Login', require('./components/LoginComponent.vue').default);
Vue.component('Createitem', require('./components/CreateItemComponent.vue').default);

import { store } from './store';

const app = new Vue({
    el: '#app',
    store
});