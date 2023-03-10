
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
import VueSocketIO from "vue-socket.io";
import SocketIO from 'socket.io-client';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const baseURL = location.protocol + '//' + location.hostname;
const socketConnection = SocketIO(`${baseURL}:${process.env.MIX_SOCKET_PORT}`);

Vue.use(new VueSocketIO({
    connection: socketConnection
}));

Vue.component("MessagesComponent", () => import("./pages/MessagesComponent.vue"));
Vue.component("MessageComponent", () => import("./components/MessageComponent.vue"));

const app = new Vue({
    el: '#app'
});
