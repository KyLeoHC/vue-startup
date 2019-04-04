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
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  class ListItem {
    static uid = 0;
    public id: number = 0;
    public text: string = 'item';
    public isDragging: boolean = false;
    public isDragEnter: boolean = false;

    constructor() {
      this.id = ListItem.uid++;
    }
  }

  const list: ListItem[] = [];
  for (let i = 0; i < 20; i++) {
    list.push(new ListItem());
  }

  let dragIndex = 0;
  let dragItem: ListItem | null = null;

  @Component({
    filters: {
      doubleNumberString(value: number): string {
        return (value > 9 ? value : ('0' + value)) + '';
      }
    }
  })
  export default class Drag extends Vue {
    list: ListItem[] = list;
    intervalId: ReturnType<typeof setInterval> | null = null;

    getRandomIndex(): number {
      return Math.floor(Math.random() * this.list.length);
    }

    onDragStart(item: ListItem, index: number) {
      dragIndex = index;
      dragItem = item;
      item.isDragging = true;
    }

    onDragEnd(item: ListItem) {
      dragItem = null;
      item.isDragging = false;
    }

    onDrop(item: ListItem) {
      item.isDragging = false;
      item.isDragEnter = false;
    }

    onDragEnter(item: ListItem, index: number) {
      if (dragItem && dragItem !== item) {
        this.list[index] = dragItem;
        this.list[dragIndex] = item;
        dragIndex = index;
        item.isDragEnter = true;
      }
    }

    onDragLeave(item: ListItem) {
      item.isDragEnter = false;
    }

    onClickAdd() {
      this.list.splice(this.getRandomIndex(), 0, new ListItem());
    }

    onClickDelete() {
      this.list.splice(this.getRandomIndex(), 1);
    }

    onClickShuffleBtn() {
      const newList: ListItem[] = [];
      const length = this.list.length;
      this.list.forEach(item => {
        let randomIndex = this.getRandomIndex();
        let exist = false;
        do {
          if (newList[randomIndex] === undefined) {
            exist = false;
            newList[randomIndex] = item;
          } else {
            randomIndex = (randomIndex + 1) % length;
            exist = true;
          }
        } while (exist);
      });
      this.list = newList;
    }

    onClickTimingShuffleBtn() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      } else {
        this.intervalId = setInterval(() => {
          this.onClickShuffleBtn();
        }, 3000);
      }
    }
  };
</script>
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
