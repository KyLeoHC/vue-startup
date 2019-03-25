/*
 * allows you to use .tsx files while enabling jsx sytnax support in your IDE to write JSX-style typescript code
 */

import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    /* eslint @typescript-eslint/no-empty-interface: 0 */
    interface Element extends VNode {
    }

    /* eslint @typescript-eslint/no-empty-interface: 0 */
    interface ElementClass extends Vue {
    }

    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
