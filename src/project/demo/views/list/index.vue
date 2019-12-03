<template>
  <div class="list-container">
    <van-nav-bar
      title="List"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <van-pull-refresh
      v-model="isRefreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model="isLoadingMore"
        :error.sync="isError"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <div class="item"
             v-for="(item, index) in list"
             :key="item.id"
             @click="linkToDetail(item)"
        >
          <p>{{ item.time }}</p>
          <p>{{ index }} - {{ item.name }}</p>
          <p>{{ item.email }}</p>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script src="./index.ts"></script>
<style lang="scss">
  .list-container {
    .item {
      padding: 30px; /* rem */
      font-size: 18px;
      border-bottom: 1px solid #eee; /* hair */
      margin-bottom: 10px; /* px */
    }
  }
</style>
