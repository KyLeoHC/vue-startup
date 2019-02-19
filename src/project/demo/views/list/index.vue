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
<script>
  import { fetchListData } from '../../services/list';

  export default {
    name: 'List',
    data() {
      return {
        list: [],
        page: 0,
        pageSize: 20,
        isError: false,
        isRefreshing: false,
        isLoadingMore: false,
        finished: false
      };
    },
    methods: {
      onClickLeft() {
        history.go(-1);
      },
      onRefresh() {
        this.loadData(true);
      },
      onLoad() {
        this.loadData();
      },
      loadData(reset = false) {
        this.page = reset ? 0 : this.page;
        fetchListData({
          page: ++this.page,
          pageSize: this.pageSize
        }).then(data => {
          this.list = reset ? data.list : this.list.concat(data.list);
          this.finished = this.list.length >= data.total;
        }).catch(response => {
          this.isError = true;
          console.error(response);
        }).finally(() => {
          this.isRefreshing = false;
          this.isLoadingMore = false;
        });
      },
      linkToDetail(item) {
        this.$router.push({
          name: 'detail',
          query: {
            ...item
          }
        });
      }
    }
  };
</script>
<style lang="stylus">
  @import "~styles/common.styl"

  .list-container {
    .item {
      padding 30px; /*rem*/
      font-size 18px
      border-bottom 1px solid #eee; /*hair*/
      margin-bottom 10px; /*px*/
    }
  }
</style>
