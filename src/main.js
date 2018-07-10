import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from "./store/index"
import * as firebase from "firebase"
import AlertCmp from "./components/Shared/Alert.vue"

Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.component("app-alert", AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyCL-bHW5RavI49dliKEFu8Jqy_XaVJrV2M",
      authDomain: "dev-meetup-c52a3.firebaseapp.com",
      databaseURL: "https://dev-meetup-c52a3.firebaseio.com",
      projectId: "dev-meetup-c52a3",
      storageBucket: "dev-meetup-c52a3.appspot.com"
    });
    this.$store.dispatch("loadMeetups")
  }
})

