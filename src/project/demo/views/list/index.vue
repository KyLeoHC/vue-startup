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
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <div class="item"
             v-for="(item, index) in list"
             :key="item.id"
             @click="linkToDetail(item)">
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
        page: 1,
        pageSize: 20,
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
        }).then(response => {
          this.list = reset ? response.data.list : this.list.concat(response.data.list);
          this.finished = this.list.length >= response.data.total;
        }).catch(response => {
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
