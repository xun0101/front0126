<template>
  <div id="app">
    <b-navbar toggleable="lg" class="app-navbar" type="dark" variant="danger">
    <b-navbar-brand href="#" class="app-none">
      <img src="./assets/logo(1).png" style="width: 150px;">
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
  <b-collapse id="nav-collapse" is-nav>
    <b-navbar-nav class="w-100">
      <div class="container d-flex flex-column flex-lg-row">
        <b-nav-item class="mx-lg-auto" to='/'><b-nav-text>首頁</b-nav-text></b-nav-item>
        <b-nav-item class="mx-lg-auto" href="#"><b-nav-text>鍋物介紹</b-nav-text></b-nav-item>
        <b-navbar-brand to='/' class="d-none d-lg-block">
          <img src="./assets/logo(1).png" style="width: 150px;">
        </b-navbar-brand>
        <b-nav-item class="mx-lg-auto" href="#"><b-nav-text>我要點餐</b-nav-text></b-nav-item>
        <b-nav-item class="mx-lg-auto" href="#"><b-nav-text>聯絡我們</b-nav-text></b-nav-item>
      </div>
      <b-nav-item class="ms-lg-auto" to='/register'><b-nav-text>註冊</b-nav-text></b-nav-item>
      <b-nav-item class="ms-lg-auto d-none d-lg-block"><b-nav-text>|</b-nav-text></b-nav-item>
      <b-nav-item class="ms-lg-auto" href="#"><b-nav-text>登入</b-nav-text></b-nav-item>
    </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <router-view></router-view>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');
</style>
