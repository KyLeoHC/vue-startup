<template>
  <div class="drag-container">
    <div class="list-operation-group">
      <button type="button"
              @click="onClickAdd">
        add item
      </button>
      <button type="button"
              @click="onClickDelete">
        delete item
      </button>
      <button type="button"
              @click="onClickShuffleBtn">
        shuffle
      </button>
      <button type="button"
              @click="onClickTimingShuffleBtn">
        {{ intervalId ? 'stop' : 'start' }} timing shuffle
      </button>
    </div>
    <transition-group name="shuffle-list" tag="ul">
      <li v-for="(item, index) in list"
          :key="item.id"
          :class="{'item--drag': item.isDragging, 'item--enter': item.isDragEnter}">
        <div draggable="true"
             @dragstart="onDragStart(item, index)"
             @dragend="onDragEnd(item)"
             @drop="onDrop(item)"
             @dragenter="onDragEnter(item, index)"
             @dragleave="onDragLeave(item)"
             @dragover.prevent>
          {{ item.text }}-{{ item.id | doubleNumberString }}
        </div>
      </li>
    </transition-group>
    <div class="note-text">Note: You can drag and drop the item.</div>
  </div>
</template>
<script src="./index.ts"></script>
<style lang="scss">
  @import "~styles/common";

  .drag-container {
    padding-top: 20px;
    font-size: 18px;
    text-align: center;

    .list-operation-group {
      margin-bottom: 20px;
    }

    .shuffle-list-enter, .shuffle-list-leave-to {
      opacity: 0;
      transform: scale(0);
      will-change: opacity, transform;
    }

    .shuffle-list-leave-active {
      position: absolute;
    }

    .shuffle-list-move {
      transition: transform .5s;
    }

    ul {
      display: inline-block;
      width: 416px;
      margin: 0 auto;
      text-align: left;

      li {
        display: inline-block;
        width: 100px;
        padding: 6px 10px;
        margin: 2px;
        border: 1px solid #666;
        transition: all .5s;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;

        &.item--drag div {
          border: 1px dashed #7d7d7d;
        }
      }
    }

    .note-text {
      margin-top: 10px;
      text-align: center;
    }
  }
</style>
