<template>
  <div :class="{
    'checkbox': 1,
    'checkbox--disabled': disabled
  }">
    <label v-bind="{'for': id}">
      <span :class="{
        'iconfont': 1,
        'icon-checkbox': checked,
        'icon-checkbox-unselected': !checked
      }">
      </span>
      <slot></slot>
    </label>
    <input type="checkbox"
           v-model="checked"
           v-bind="{ id, disabled }"
           @change="onChange"
           hidden>
  </div>
</template>
<script>
  let uid = 0;

  export default {
    name: 'Checkbox',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        id: `checkbox-${uid++}`,
        checked: this.value
      };
    },
    watch: {
      value(value) {
        this.checked = value;
      }
    },
    methods: {
      onChange() {
        this.$emit('input', this.checked);
      }
    }
  };
</script>
<style lang="stylus">
  @import "~styles/common.styl"

  .checkbox {
    font-size 16px
    color #333

    &.checkbox--disabled {
      .iconfont {
        color #848484
      }
    }

    .icon-checkbox,
    .icon-checkbox-unselected {
      color greenColor
    }
  }
</style>
