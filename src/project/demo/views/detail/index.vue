<template>
  <div class="detail-container">
    <van-nav-bar
      title="Detail"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <div class="logo"></div>
    <header>user info</header>
    <div class="user-info">
      <div>name: {{ $route.query.name }}</div>
      <div>email: {{ $route.query.email }}</div>
    </div>
    <a href="javascript:;"
       @click="linkToDemo2"
    >
      {{ linkText }}
    </a>
  </div>
</template>
<script src="./index.ts"></script>
<style lang="scss">
  .detail-container {
    font-size: 18px;
    text-align: center;

    .logo {
      $w: 200px;

      width: $w; /* rem */
      height: $w; /* rem */
      margin: 20px auto 10px auto;
      background: url(/static/images/logo.png) no-repeat;
      background-size: cover;
    }

    .user-info {
      font-size: 14px;

      & > div {
        margin: 10px;
      }
    }
  }
</style>
