<template>
<div id="footer1" class="bg-dark">
  <div class="p-5">
    <div class="d-flex align-items-center justify-content-around flex-column flex-md-row">
    <div class="d-flex flex-column justify-content-center">
      <p class="text-white font-weight-bold">吃香喝辣餐飲事業股份有限公司</p>
      <p class="text-white font-weight-bold">TEL：08 755 5481</p>
      <p class="text-white font-weight-bold">ADD：屏東縣屏東市大武路286號900 1號</p>
      <p class="text-white font-weight-bold">營業時間：16:00 - 00:00(星期四公休)</p>
    </div>
    <div class="d-flex flex-column align-items-center">
      <img src="../assets/image/logo2.png" class="f1-img">
      <p class="text-white mt-5">此網頁僅為練習使用，如有版權問題請告知，會立即刪除</p>
    </div>
    <div class="d-flex flex-column">
      <p class="text-white text-center font-weight-bold">社群媒體</p>
      <div class="d-flex justify-content-around mt-3">
        <button type="button" class="f1-btn" v-b-modal.modal-line>
          <font-awesome-icon class="mx-2 f1-icon" :icon="['fab', 'line']" size="2x"/>
        </button>
        <button type="button" class="f1-btn">
          <font-awesome-icon class="mx-2 f1-icon" :icon="['fab', 'facebook']" size="2x"/>
        </button>
        <button type="button" class="f1-btn">
          <font-awesome-icon class="mx-2 f1-icon" :icon="['fab', 'instagram']" size="2x"/>
        </button>
        <button type="button" class="f1-btn">
          <font-awesome-icon class="mx-2 f1-icon" :icon="['fab', 'twitter']" size="2x"/>
        </button>
    </div>
    <b-modal id="modal-line" centered hide-footer title="快加入line好友，獲得更多資訊吧">
      <div class="text-center">
        <img class="" src="../assets/image/line.jpg">
      </div>
    </b-modal>
    </div>
  </div>
  </div>
</div>
</template>
