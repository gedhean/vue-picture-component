import Vue from "vue";
// import App from "./App.vue";
import VPicture from "./components/VPicture.vue";
import VueCroppie from "vue-croppie";
import "croppie/croppie.css";

Vue.config.productionTip = false;

Vue.use(VueCroppie);

window.locale = 'pt-BR'

new Vue({
  render: h => h(VPicture)
}).$mount("#app");
