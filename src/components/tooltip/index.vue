<template>
  <div class="tooltip"
       v-clickoutside="hide"
       @click="toggle"
  >
    <slot/>
  </div>
</template>
<script>
  import Vue from 'vue';
  import content from './content';
  import { computeOffset } from '@/utils';
  import clickoutside from '@/directives/clickoutside';

  // todo: 暂时只会给定一个位置，具体细节定位请父组件自行微调定位，后续再考虑假如自动计算最佳位置功能
  // todo: 后续再考虑对局部滚动的情况下，tooltip跟随元素滚动的效果
  // todo: 后续再考虑增加对TooltipContent实例数量限制的功能(隐藏的时候就自动销毁)，以节约大量实例组件带来的内存消耗
  export default {
    name: 'Tooltip',
    props: {
      offsetX: {
        type: Number,
        default: 0
      },
      offsetY: { // 这个暂时不会用到，除非日后支持垂直方向
        type: Number,
        default: 0
      },
      contentClass: {
        type: String,
        default: ''
      }
    },
    directives: {
      clickoutside
    },
    methods: {
      toggle() {
        let contentComponent = this.contentComponent;
        if (!contentComponent) {
          contentComponent = new Vue(content).$mount();
          document.body.appendChild(contentComponent.$el);
          contentComponent.contentClass = this.contentClass;
          contentComponent.__slot = this.$slots.content;
          // 不会产生依赖追踪组件引用保存
          this.contentComponent = contentComponent;
        }
        if (!contentComponent.position) {
          // 计算获取要依附的目标元素位置
          const position = computeOffset(this.$el);
          position.offsetTop += this.$el.clientHeight + 6 + this.offsetY;
          position.offsetLeft += this.offsetX;
          contentComponent.position = position;
          // 减去4，那个是箭头本身宽度的一半
          contentComponent.arrowOffset = this.$el.clientWidth / 2 - 4 - this.offsetX;
        }
        contentComponent.visible = !contentComponent.visible;
      },
      hide() {
        if (this.contentComponent) {
          this.contentComponent.visible = false;
        }
      },
      removeTooltipContent() {
        if (this.contentComponent) {
          document.body.removeChild(this.contentComponent.$el);
          this.contentComponent.$destroy();
          this.contentComponent = null;
        }
      }
    },
    beforeDestroy() {
      this.removeTooltipContent();
    }
  };
</script>
<style lang="scss">
  .tooltip {
    display: inline-flex;
    align-items: center;
  }

  .tooltip-content {
    position: absolute;
    min-width: 10px;
    padding: 14px; /* px */
    font-size: 32px; /* px */
    color: #fff;
    background: #3b413c;
    border-radius: 4px;
    z-index: 101;
  }

  .tooltip-content__arrow {
    position: absolute;
    top: -8px;

    &::before {
      content: '';
      display: block;
      border: 4px solid #3b413c;
      border-top-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
    }
  }

</style>
