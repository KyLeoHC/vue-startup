// more options:
// https://vue-test-utils.vuejs.org/zh/api/
import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import VueRouter from 'vue-router';
import Detail from '@/project/demo/views/detail/index.vue';

const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);

const wrapper = shallowMount(Detail, {
  localVue,
  router,
  stubs: ['van-nav-bar']
});

describe('project/demo/views/detail/index.vue', () => {
  test('test detail element', () => {
    expect(wrapper.contains('.detail-container')).toBe(true);
  });

  test('test link text', () => {
    expect(wrapper.find('a').text()).toBe('跳转到demo2');
  });
});
