<template>
  <div class="list-container">
    <van-nav-bar
      title="List"
      left-arrow
      @click-left="onClickLeft">
    </van-nav-bar>
    <van-pull-refresh
      v-model="isRefreshing"
      @refresh="onRefresh">
      <van-list
        v-model="isLoadingMore"
        :error.sync="isError"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad">
        <div class="item"
             v-for="(item, index) in list"
             :key="item.id"
             @click="linkToDetail(item)">
          <p>{{ item.time }}</p>
          <p>{{ index }} - {{ item.name }}</p>
          <p>{{ item.email }}</p>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import {
    ListItem,
    fetchListData
  } from '../../services/list';

  @Component
  export default class List extends Vue {
    list: ListItem[] = [];
    page: number = 0;
    pageSize: number = 20;
    isError: boolean = false;
    isRefreshing: boolean = false;
    isLoadingMore: boolean = false;
    finished: boolean = false;

    onClickLeft() {
      history.go(-1);
    }

    onRefresh() {
      this.loadData(true);
    }

    onLoad() {
      this.loadData();
    }

    loadData(reset = false) {
      this.page = reset ? 0 : this.page;
      fetchListData({
        page: ++this.page,
        pageSize: this.pageSize
      }).then(data => {
        if (data.list) {
          this.list = reset ? data.list : this.list.concat(data.list);
        }
        this.finished = this.list.length >= data.total;
      }).catch(() => {
        this.isError = true;
      }).finally(() => {
        this.isRefreshing = false;
        this.isLoadingMore = false;
      });
    }

    linkToDetail(item: ListItem) {
      this.$router.push({
        name: 'detail',
        query: {
          id: item.id,
          name: item.name,
          email: item.email,
          time: (item.time || '') + ''
        }
      });
    }
  };
</script>
<style lang="scss">
  @import "~styles/common";

  .list-container {
    .item {
      padding: 30px; /* rem */
      font-size: 18px;
      border-bottom: 1px solid #eee; /* hair */
      margin-bottom: 10px; /* px */
    }
  }
</style>
