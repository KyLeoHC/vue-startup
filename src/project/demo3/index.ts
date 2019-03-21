import Vue from 'vue';
import App from './app.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');

export default class A {
  public name: string = '1';
  public setName(value: string): void {
    this.name = value;
  }

  public getName(): string {
    return this.name;
  }
}

console.log(A);
